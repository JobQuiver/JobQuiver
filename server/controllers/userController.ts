import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export const userController = {
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
  
};
