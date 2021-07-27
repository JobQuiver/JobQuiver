import { Router, Request, Response } from 'express';

import savedResultsController from '../controllers/savedResultsController';

const savedResultRouter = Router();

savedResultRouter.get(
  '/',
  // auth?
  savedResultsController.getSavedResults,
  (req: Request, res: Response) => res.status(200).send(res.locals.results)
);

savedResultRouter.get(
  '/:id',
  // auth?
  savedResultsController.getSavedResult,
  // (req: Request, res: Response) => res.status(200).send(res.locals.results)
  (req: Request, res: Response) => res.status(200).send('GET /savedResults/:id')
);

savedResultRouter.post(
  '/',
  // auth?
  savedResultsController.saveResult,
  // (req: Request, res: Response) => res.status(200).send(res.locals.result)
  (req: Request, res: Response) => res.status(201).send('POST /savedResults')
);

savedResultRouter.delete(
  '/:id',
  // auth?
  savedResultsController.unsaveResult,
  (req: Request, res: Response) => res.status(200).send('DELETE /savedResults')
  // (req: Request, res: Response) => res.sendStatus(204)
);

export default savedResultRouter;
