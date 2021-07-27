import { Router, Request, Response, NextFunction } from 'express';


const loginRoute = Router();

loginRoute.use('/auth', (req: Request, res: Response) => {
  res.status(200);
})

loginRoute.use('/oauth/google', (req: Request, res: Response) => {
  res.status(200);
})