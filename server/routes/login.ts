import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/userController';
import { tokenController } from '../controllers/tokenController';

const loginRouter = Router();

loginRouter.post('/auth', userController.verifyUser, tokenController.createToken, (req: Request, res: Response) => {
  res.status(200).send();
})

loginRouter.post('/auth/verify', tokenController.verifyToken, (req: Request, res: Response) => {
  res.status(200).send({verified: res.locals.verified});
})

loginRouter.post('/oauth/google', (req: Request, res: Response) => {
  res.status(200).send();
})

export default loginRouter;