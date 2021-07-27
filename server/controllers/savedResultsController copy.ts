import { Request, Response, NextFunction } from 'express';

import db from '../models/resultModel';

const savedResultsController = {
  // The current getSavedResults middleware assumes that a userId will be provided
  // via the authMiddleware. -DLA
  getSavedResults: async (req: Request, res: Response, next: NextFunction) => {
    // const { userId } = res.locals;
    // const getAllSavedResultsQueryParams = [userId];
    // const getAllSavedResultsQuery = `
    //   SELECT results.*
    //   FROM results
    //   JOIN users_saved_results
    //   ON users_saved_results.user_id = ($1);
    // `;
  
    try {
      // const savedResults = await db.query(getAllSavedResultsQuery, getAllSavedResultsQueryParams);
      // res.locals.results = savedResults.rows;
  
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.getSavedResults middleware: ${e}`,
        message: 'An error occurred while getting all saved results.',
      })
    }
  },
  getSavedResult: async (req: Request, res: Response, next: NextFunction) => {
    // const { id } = req.params;
    // const getSavedResultQueryParams = [id];
    // const getSavedResultQuery = `
    //   SELECT *
    //   FROM results
    //   WHERE _id = ($1);
    // `;
  
    try {
      // const savedResult = await db.query(getSavedResultQuery, getSavedResultQueryParams);
      // res.locals.result = savedResult.rows[0];
  
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.getSavedResult middleware: ${e}`,
        message: 'An error occurred while getting a saved result.',
      })
    }
  },
  //! saveResult middleware not complete; need to save in a joins table to join a result and a user. 
  //! Better implementation would be check if the result already exists in the results table. 
  // -DLA
  // The current saveResult middleware assumes that a userId will be provided
  // via the authMiddleware. -DLA
  saveResult: async (req: Request, res: Response, next: NextFunction) => {
    // const { someData, someOtherData } = req.body;
    // const { userId } = res.locals;
    // const saveResultQueryParams = [someData, someOtherData];

    // const createResultQuery = `
    //   INSERT INTO results (col1, col2)
    //   VALUES ($1, $2)
    //   RETURNING *;
    // `;

    // const saveResultToUserQuery = `
    //   INSERT INTO users_saved_results (user_id, result_id)
    //   VALUES ($1, $2);
    // `

    try {
      // const savedResult = await db.query(createResultQuery, saveResultQueryParams);

      // const result = savedResult.rows[0];
      // const resultId = result._id;
      // const saveResultToUserQueryParams = [userId, resultId];

      // await db.query(saveResultToUserQuery, saveResultToUserQueryParams);

      // res.locals.result = result;
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.saveResult middleware: ${e}`,
        message: 'An error occurred while saving a result.',
      })
    }
  },
  // The logic for this middleware currently is working by removing an entry from the
  // users/results join table; it would be worth revisiting to see if we want to
  // just remove entries from the results table also. -DLA
  // The current saveResult middleware assumes that a userId will be provided
  // via the authMiddleware. -DLA
  unsaveResult: async (req: Request, res: Response, next: NextFunction) => {
    // const resultId = req.params.id;
    // const { userId } = res.locals;
    // const unsaveResultFromUserQueryParams = [resultId, userId];
    // const unsaveResultFromUserQuery = `
    //   DELETE FROM users_saved_results
    //   WHERE result_id = ($1)
    //   AND result_id = ($2);
    // `

    try {
      // await db.query(unsaveResultFromUserQuery, unsaveResultFromUserQueryParams);
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.unsaveResult middleware: ${e}`,
        message: 'An error occurred while un-saving a result.',
      })
    }
  },
};

export default savedResultsController;
