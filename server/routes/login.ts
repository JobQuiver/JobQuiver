import { Router, Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/authController';

const loginRouter = Router();

loginRouter.post('/auth', authController.createCookie, (req: Request, res: Response) => {
  res.status(200).send();
})

loginRouter.post('/auth/verify', authController.verify, (req: Request, res: Response) => {
  res.status(200).send();
})

loginRouter.post('/oauth/google', (req: Request, res: Response) => {
  res.status(200).send();
})

export default loginRouter;