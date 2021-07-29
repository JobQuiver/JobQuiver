import { Request, Response, NextFunction } from 'express';
import { getAllJSDocTagsOfKind } from 'typescript';
import db from '../models/resultModel';

const fetch = require('node-fetch');
const GITHUB_STATE = process.env.GITHUB_STATE;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECTPORT = process.env.NODE_ENV === 'production' ? 3000 : 8080;
console.log(GITHUB_STATE);
export const userController = {

  signupAuthUser: async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;
    const signupParams = [username, password];

    const checkUsername = `
      SELECT u.username, u.id
      FROM users
      AS u
      WHERE username = ($1);
    `;

    const createUser = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *;
    `;

    if(username && password){
      //check if username exist
      try {
        let user = await db.query(checkUsername, [username]);
        //if username exist exit
        if(user.rows.length){
          return next({
            log: 'Username already exist.',
            message: 'Signup unsuccessful.',
          })
        }

        user = await db.query(createUser, signupParams);

        res.locals.verified = true;
        req.body.userId = user.rows[0].id;
        return next();
      } catch (e){
        return next({
          log: `An error occurred in the signupAuthUser middleware: ${e}`,
          message: 'Could not create user.',
        })
      }
    }
  },


  verifyAuthUser: async (req: Request, res: Response, next: NextFunction)=> {
    const {username, password} = req.body;
    const loginQueryParams = [username, password];

    const loginQuery = `
      SELECT u.username, u.id
      FROM users
      AS u
      WHERE username = ($1)
      AND password = ($2);
    `;

    if (username && password) {
      //check db and see if information matches
      //need logic to res.locals.verified
      try{
        const user = await db.query(loginQuery, loginQueryParams);
        console.log(user);
        if (!user.rows.length) {
          return next({
            log: 'No username-password match.',
            message: 'Login unsuccessful.',
          })
        }
        res.locals.verified = true;
        req.body.userId = user.rows[0].id;
        return next();
      } catch(e){
        return next({
          log: `An error occurred in the verifyAuthUser middleware: ${e}`,
          message: 'Could not find or create user.',
        })
      }  
    }
  },

  verifyOAuthGoogle: async (req: Request, res: Response, next: NextFunction) => {

  },

  verifyOAuthGithub: async (req: Request, res: Response, next: NextFunction) => {
    //req.body.userInfo.id = github ID
    const githubId = req.body.userInfo.id;
    console.log('githubID at this point', githubId);
    const checkUsersByGithubIdQueryParams = [githubId];

    const checkUsersByGithubIdQuery = `
      SELECT *
      FROM users
      WHERE githubId = ($1);
    `;
    const createUserByGithubIdQuery = `
      INSERT INTO users (githubId)
      VALUES ($1)
      RETURNING *;
    `;

    try {
      //check on database if req.body.userInfo.id exist in githubID for userTable
      let user = await db.query(
        checkUsersByGithubIdQuery,
        checkUsersByGithubIdQueryParams
      );

      //if if it does NOT, create user
      if (!user.rows.length) {
        user = await db.query(
          createUserByGithubIdQuery,
          checkUsersByGithubIdQueryParams
        );
      }

      req.body.userId = user.rows[0].id;
      next(); 
    } catch (e) {
      return next({
        log: `An error occurred in the verifyOAuthGithub middleware: ${e}`,
        message: 'Could not find or create user.',
      })
    }

  },

  requestOAuthGitHub: async (req: Request, res: Response, next: NextFunction) => {
    res.locals.url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${GITHUB_STATE}&redirect_uri=http://localhost:${REDIRECTPORT}/login/oauth/githubCallback`;
    next();
  },

  callbackOAuthGitHub: async (req: Request, res: Response, next: NextFunction) => {
    if(req.query.state !== GITHUB_STATE) res.status(404).send();
    
    const codeFetch = await fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code,
      })
    })
    const data = await codeFetch.text();
    const params = new URLSearchParams(data);
    const accessT = params.get('access_token');

    const userFetch = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${accessT}`,
      },
    })
    const userInfo = await userFetch.json();
    console.log('userInfo', userInfo);
    req.body.userInfo = userInfo;
    return next();
  }


  
};
