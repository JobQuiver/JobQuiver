import { Request, Response, NextFunction } from 'express';

import db from '../models/resultModel';

const savedResultsController = {
  getSavedResults: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const getAllSavedResultsQueryParams = [userId];
    console.log('current user id (should be 2)', userId);

    const getAllSavedResultsQuery = `
      SELECT r.*
      FROM results
      AS r
      WHERE r.id
      IN (
        SELECT u.resultId
        FROM users_saved_results
        AS u
        WHERE u.userId = ($1)
      );
    `;
  
    try {
      const savedResults = await db.query(
        getAllSavedResultsQuery,
        getAllSavedResultsQueryParams
      );

      res.locals.results = savedResults.rows;
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
    const { id } = req.params;
    const getSavedResultQueryParams = [id];

    const getSavedResultQuery = `
      SELECT *
      FROM results
      WHERE id = ($1);
    `;
  
    try {
      const savedResult = await db.query(
        getSavedResultQuery,
        getSavedResultQueryParams
      );

      res.locals.result = savedResult.rows[0];
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.getSavedResult middleware: ${e}`,
        message: 'An error occurred while getting a saved result.',
      })
    }
  },
  saveResult: async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      location,
      description,
      link,
      companyName,
      apiWebsite,
      apiId,
    } = req.body;
    const saveResultQueryParams = [
      title,
      location,
      description,
      link,
      companyName,
      apiWebsite,
      apiId,
    ];

    const { userId } = req.body;
    console.log('userId, should be 2 for hello,', userId);

    const findResultQuery = `
      SELECT * 
      FROM results 
      WHERE title = ($1)
      AND location = ($2)
      AND description = ($3)
      AND link = ($4)
      AND companyName = ($5)
      AND apiWebsite = ($6)
      AND apiId = ($7);
    `

    const createResultQuery = `
      INSERT INTO results (title, location, description, link, companyName, apiWebsite, apiId)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const saveResultToUserQuery = `
      INSERT INTO users_saved_results (userId, resultId)
      VALUES ($1, $2);
    `

    try {
      let savedResult = await db.query(
        findResultQuery,
        saveResultQueryParams
      );

      if (!savedResult.rows.length) {
        savedResult = await db.query(
          createResultQuery,
          saveResultQueryParams
        );
      }

      const result = savedResult.rows[0];
      const resultId = result.id;
      const saveResultToUserQueryParams = [userId, resultId];

      await db.query(saveResultToUserQuery, saveResultToUserQueryParams);

      res.locals.result = result;
      return next();
    } catch (e) {
      return next({
        status: 400,
        log: `Error occurred in the savedResultsController.saveResult middleware: ${e}`,
        message: 'An error occurred while saving a result.',
      })
    }
  },
  unsaveResult: async (req: Request, res: Response, next: NextFunction) => {
    const resultId = req.params.id;
    const { userId } = req.body;

    const unsaveResultFromUserQueryParams = [resultId, userId];
    const unsaveResultFromUserQuery = `
      DELETE FROM users_saved_results
      WHERE resultId = ($1)
      AND userId = ($2);
    `

    try {
      await db.query(
        unsaveResultFromUserQuery,
        unsaveResultFromUserQueryParams
      );
      
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
