const express = require('express');
import MuseAPI from '../apis/muse';
import FindworkAPI from '../apis/findwork.dev';
import searchController from '../controllers/searchController';

const apis = [
  new MuseAPI(),
  new FindworkAPI(),
];

const searchRouter = express.Router();

searchRouter.get('/', searchController.search, (req, res) =>{
  res.status(200).json(res.locals);
});


export default searchRouter;
