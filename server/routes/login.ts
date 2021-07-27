import { Router, Request, Response, NextFunction } from 'express';


const loginRouter = Router();

loginRouter.use('/auth', (req: Request, res: Response) => {
  res.status(200);
})

loginRouter.use('/oauth/google', (req: Request, res: Response) => {
  res.status(200);
})

export default loginRouter;