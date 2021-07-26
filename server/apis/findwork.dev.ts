const fetch = require('node-fetch');
import JobAPI from "./api";

const ITEM_COUNT = 50;

/**
 * findwork.dev
 * Docs:
 * Request URL: https://findwork.dev/api/jobs/
 */
 export default class FindworkAPI extends JobAPI {
  constructor() {
    super('findwork.dev');
  }

  search(page:number, locations:string[], keywords:string[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const setKeywords = keywords.join();
        // make a fetch request to the api
        const url = 'https://findwork.dev/api/jobs/?search=' + keywords.reduce((str, k) => str + '+' + k, '') + '&' + locations.reduce((str, l, i) => str + 'location=' + l + (i !== locations.length - 1 ? '&': ''), '');
        const jobs = await fetch(url, {Authorization: 'Token ' + process.env.FINDWORK_API_KEY}).then(res => res.json());
        // iterate over items
        const parsedJobs = [];
        for(let i = (page - 1) * ITEM_COUNT; i < page * ITEM_COUNT - 1; i++) {
          const j = jobs.results[i];
          // convert format to result format and give it a score
          const job = {
              title: j.role,
              location: j.location,
              description: j.text,
              link: j.url,
              companyName: j.company_name,
              keywords: setKeywords,
              apiWebsite: 'findwork.dev',
              apiId: j.id.toString(),
              score: JobAPI.score(j.contents, keywords),
          }
          parsedJobs.push(jobs);
        };

        // resolve with the items
        resolve(parsedJobs);
      }
      catch(error) {
        reject(error);
      }
    });
  }

  // needs implementation
  getItem(id:number) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}