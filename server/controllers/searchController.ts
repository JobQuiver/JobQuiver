import { Request, Response, NextFunction } from 'express';

// TODO: update status codes

const searchController = {
  getSearchItems: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: get search params from query string. 
    try {
      // TODO: add in work for getting data from APIs. 
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the searchController.getSearchItems middleware: ${e}`,
        message: 'An error occurred while searching for jobs.',
      })
    }
  },
};

export default searchController;
