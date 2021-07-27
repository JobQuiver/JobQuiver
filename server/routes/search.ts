import { Router, Request, Response } from 'express';

import searchController from '../controllers/searchController';

const searchRouter = Router();

searchRouter.get(
  '/',
  // auth?
  searchController.getSearchItems,
  // (req: Request, res: Response) => res.status(200).send(res.locals.results)
  (req: Request, res: Response) => res.status(200).send('GET /search')
);

//! Possibly not needed; will depend on APIs. 
// searchRouter.get(
//   '/:id',
//   // auth?
//   searchController.getSearchItem,
//   // (req: Request, res: Response) => res.status(200).send(res.locals.results)
//   (req: Request, res: Response) => res.status(200).send('GET /search/:id')
// );

export default searchRouter;
