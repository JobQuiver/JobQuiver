import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/userController';
import { tokenController } from '../controllers/tokenController';

const loginRouter = Router();

loginRouter.post('/auth', userController.verifyAuthUser, tokenController.createToken, (req: Request, res: Response) => {
  res.status(200).send({verified: res.locals.verified});
})

loginRouter.post('/verifyToken', tokenController.verifyToken, (req: Request, res: Response) => {
  res.status(200).send({verified: res.locals.verified});
})

loginRouter.post('/oauth/google', userController.verifyOAuthGoogle, (req: Request, res: Response) => {
  res.status(200).send();
})

loginRouter.get('/oauth/github', userController.requestOAuthGitHub, (req: Request, res: Response) => {
  res.status(200).send({'url': res.locals.url});
})

loginRouter.get('/oauth/githubCallback', userController.callbackOAuthGitHub, userController.verifyOAuthGithub, tokenController.createToken, (req: Request, res: Response) => {
  res.status(200).redirect('/');
})

export default loginRouter;