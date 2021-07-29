import { Router, Request, Response } from 'express';

import savedResultsController from '../controllers/savedResultsController';
import { tokenController } from '../controllers/tokenController';

const savedResultRouter = Router();

savedResultRouter.get(
  '/',
  tokenController.verifyToken,
  savedResultsController.getSavedResults,
  (req: Request, res: Response) => res.status(200).send(res.locals.results)
);

savedResultRouter.get(
  '/:id',
  tokenController.verifyToken,
  savedResultsController.getSavedResult,
  (req: Request, res: Response) => res.status(200).send(res.locals.result)
);

savedResultRouter.post(
  '/',
  tokenController.verifyToken,
  savedResultsController.saveResult,
  (req: Request, res: Response) => res.status(200).send(res.locals.result)
);

savedResultRouter.delete(
  '/:id',
  tokenController.verifyToken,
  savedResultsController.unsaveResult,
  (req: Request, res: Response) => res.sendStatus(204)
);

export default savedResultRouter;
