import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const SECRETKEY = 'LOLLLLLLLSSSSSSS';
const MAXAGE = 120;

export const authController = {
  verifyUser: async (req: Request, res: Response, next: NextFunction)=> {
    const {username, password} = req.body;
    let userId = 9999;
    if(username && password){
      //check db and see if information matches
      //need logic to res.locals.verify
      //take userID and put into req.userID = userID;
      req.body.userId = userId;
    }
    next();
  },

  createCookie: async (req: Request, res: Response, next: NextFunction) =>  {
    let tokenKey;
    await jsonwebtoken.sign({ userId: req.body.userId }, SECRETKEY, {expiresIn: MAXAGE}, function(err, token){
      tokenKey = token
    });
    res.cookie('JQTokenKey', tokenKey);
    await jsonwebtoken.verify(tokenKey, SECRETKEY, function(err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
      }
      else{
        console.log(decoded);
      }
    });
    next();
  },

  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    let verified = false;
    if(req.cookies.JQTokenKey){
      await jsonwebtoken.verify(req.cookies.JQTokenKey, SECRETKEY, function(err, decoded) {
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
         console.log('expired token');
         res.cookie('JQTokenKey', '00', {maxAge: 0});
        }
        else{
          req.body.userId = decoded.userId;
          console.log('req.body.userId', req.body.userId);
          verified = true;
        }
      });
    }
    res.locals.verified = verified;
    return next();
  }
  
};
