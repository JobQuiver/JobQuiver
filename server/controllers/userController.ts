import { Request, Response, NextFunction } from 'express';
import { getAllJSDocTagsOfKind } from 'typescript';
const fetch = require('node-fetch');
const GITHUB_STATE = process.env.GITHUB_STATE;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECTPORT = process.env.NODE_ENV === 'production' ? 3000 : 8080;
console.log(GITHUB_STATE);
export const userController = {
  verifyAuthUser: async (req: Request, res: Response, next: NextFunction)=> {
    const {username, password} = req.body;
    let userId = 9999;
    if(username && password){
      //check db and see if information matches
      //need logic to res.locals.verified
      res.locals.verified = true;
      //take userID and put into req.userID = userID;
      req.body.userId = userId;
    }
    next();
  },

  verifyOAuthGoogle: async (req: Request, res: Response, next: NextFunction) => {

  },

  verifyOAuthGithub: async (req: Request, res: Response, next: NextFunction) => {
    //req.body.userInfo.id = github ID
    //req.body.userInfo.login = github username
    //check on database if req.body.userInfo.id exist in githubID for userTable
    //if if it does NOT
    //create user
    // INSERT INTO results (title, location, description, link, companyName, apiWebsite, apiId)
    //   VALUES ($1, $2, $3, $4, $5, $6, $7)
    //   RETURNING *;

    //get userID from database
    //save to req.body.userId
    //remove next line, it is for testing purpose
    req.body.userId = req.body.userInfo.id;
    next(); 
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
    next();
  }


  
};
