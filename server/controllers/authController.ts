import { Request, Response, NextFunction } from 'express';

const authController = {
  verifyUser: async (req: Request, res: Response, next: NextFunction)=> {
    const {username, password} = req.body;
    if(username && password){
      //check db and see if information matches
    }
    next();
  },

  createCookie: (req: Request, res: Response, next: NextFunction) =>  {
    
  }
  
};
