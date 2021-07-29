import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
const SECRETKEY = 'LOLLLLLLLSSSSSSS';
const MAXAGE = 120;

export const tokenController = {
  createToken: async (req: Request, res: Response, next: NextFunction) =>  {
    // let tokenKey;
    await jsonwebtoken.sign({ userId: req.body.userId }, SECRETKEY, {expiresIn: MAXAGE}, function(err, token){
      if(err){
        console.log(err);
      }
      else{
        res.cookie('JQTokenKey', token);
      }
      next();
    });
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
          verified = true;
        }
      });
    }
    res.locals.verified = verified;
    return next();
  }

}