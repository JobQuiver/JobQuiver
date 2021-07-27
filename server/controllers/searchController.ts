import JobAPI from "../apis/api";
import JobBST from "../util/JobBST";

const searchController = {
  search: async (req, res, next) => {
    try {
      // sanitize inputs
      const {page, locations, keywords } = req.query;
      if(typeof(page) !== 'string' || Number(page) < 0) return next({ message:'Illegal page request: ' + page, status:401, log:'User error in search request' });
      if(typeof(locations) !== 'string') return next({ message:'Illegal locations request', status:401, log:'User error in search request' });
      if(typeof(keywords) !== 'string') return next({ message:'Illegal keywords request', status:401, log:'User error in search request' });
      // iterate over the apis and get promises
      let jobsList = [];
      const jobsRes = await Promise.all(Object.values(JobAPI.list).map(api => api.search(Number(page), locations.split('+'), keywords.split('+'))))
      // merge the apis into one list
      const jobbst = new JobBST<any>();
      jobsRes.forEach(res => res.forEach(j => jobbst.add(j.score, j)));
      jobsList = jobbst.inOrder();

      //send the list back
      res.locals = jobsList;
      return next();
    }
    catch(error) {
      return next({
        log: 'Error in searchController.search: ' + error,
        message: 'Server error, check the logs',
      });
    }
  },
  getItem: async (req, res, next) => {
    try {
      const { id, api } = req.params;
      if(typeof(id) !== 'string' || Number(id) < 0) return next({ message:'Illegal id request: ' + id, status:401, log:'User error in get item request' });
      if(typeof(api) !== 'string' || JobAPI.list[api] === undefined) return next({ message:'Illegal api request: ' + api, status:401, log:'User error in get item request' });
      res.locals = await JobAPI.list[api].getItem(id);
      return next();
    }
    catch(error) {
      return next({
        log: 'Error in searchController.search: ' + error,
        message: 'Server error, check the logs',
      });
    }
  },
}

export default searchController;
