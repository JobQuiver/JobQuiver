import { Router, Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/authController';

const loginRouter = Router();

loginRouter.post('/auth', authController.verifyUser, authController.createCookie, (req: Request, res: Response) => {
  res.status(200).send();
})

loginRouter.post('/auth/verify', authController.verifyToken, (req: Request, res: Response) => {
  res.status(200).send({verified: res.locals.verified});
})

loginRouter.post('/oauth/google', (req: Request, res: Response) => {
  res.status(200).send();
})

export default loginRouter;