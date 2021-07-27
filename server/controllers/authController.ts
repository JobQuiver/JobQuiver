import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const SECRETKEY = 'LOLLLLLLLSSSSSSS';

export const authController = {
  verifyUser: async (req: Request, res: Response, next: NextFunction)=> {
    const {username, password} = req.body;
    if(username && password){
      //check db and see if information matches
    }
    next();
  },

  createCookie: async (req: Request, res: Response, next: NextFunction) =>  {
    let tokenKey;
    await jsonwebtoken.sign({ foo: 'bar' }, SECRETKEY, function(err, token){
      console.log(token);
      tokenKey = token
    });
    console.log(tokenKey);
    res.cookie('tokenKey', tokenKey);
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
  verify: async (req: Request, res: Response, next: NextFunction) => {
    // await jsonwebtoken.verify(tokenKey, 'shhhhh', function(err, decoded) {
    //   if (err) {
    //     /*
    //       err = {
    //         name: 'TokenExpiredError',
    //         message: 'jwt expired',
    //         expiredAt: 1408621000
    //       }
    //     */
    //   }
    //   else{
    //     console.log(decoded);
    //   }
    // });
    next();
  }
  
};
