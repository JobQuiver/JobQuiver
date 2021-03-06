const fetch = require('node-fetch');
import JobAPI from "./api";
import * as Types from './api';

const PAGE_COUNT = 50;

/**
 * findwork.dev
 * Docs:
 * Request URL: https://findwork.dev/api/jobs/
 */
 export default class FindworkAPI extends JobAPI {
  constructor() {
    super('findwork.dev');
  }

  search(page:number, {locations, keywords, level}:Types.SearchOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const setKeywords = keywords.join();
        // make a fetch request to the api
        const url = 'https://findwork.dev/api/jobs/?search=' + 
          keywords.reduce((str, k, i) => str + (i !== 0 ? '+' : '') + k, '') + (level !== undefined ? '+' + level : '') + '&' + 
          locations.reduce((str, l, i) => str + 'location=' + l + (i !== locations.length - 1 ? '&': ''), '');

        console.log('Requesting date from Findwork.dev: ' + url);
        const jobs = await fetch(url, {headers: {Authorization: 'Token ' + process.env.FINDWORK_API_KEY}}).then(res => res.json());
        console.log('Received data from Findwork.dev = ', jobs.results?.length);
        // iterate over items
        if(!jobs.results) throw JSON.stringify(jobs);

        let start = (page - 1) * PAGE_COUNT
        let end = start + PAGE_COUNT + 1;
        if(jobs.count < PAGE_COUNT) {
          start = 0;
          end = jobs.count;
        }
        
        const parsedJobs = [];
        for(let i = start; i < end; i++) {
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
              score: JobAPI.score(j.text, keywords),
          }
          parsedJobs.push(job);
        };

        // resolve with the items
        resolve(parsedJobs);
      }
      catch(error) {
        reject('[Findwork.dev] ' + error);
      }
    });
  }

  getItem(id:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = 'https://findwork.dev/api/jobs/' + id;
        const job = await fetch(url, {headers: {Authorization: 'Token ' + process.env.FINDWORK_API_KEY}}).then(res => res.json());
        if(job.detail) throw JSON.stringify(job);
        resolve({
          title: job.role,
          location: job.location,
          description: job.text,
          link: job.url,
          companyName: job.company_name,
          apiWebsite: 'findwork.dev',
          apiId: job.id.toString(),
      });
      }
      catch(error) {
        reject('[Findwork.dev] ' + error);
      }
    });
  }
}