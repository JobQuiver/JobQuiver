const fetch = require('node-fetch');
import JobAPI from './api';
import * as Types from './api';

/**
 * The Muse
 * Docs: https://www.themuse.com/developers/api/v2
 * Request URL: https://www.themuse.com/api/public/jobs
 * 
 * levels: ['Entry%20Level', 'Mid%20Level', 'Senior%20Level', 'management', 'Internship']
 */
export default class MuseAPI extends JobAPI {
  constructor() {
    super('muse');
  }

  search(page:number, {locations, keywords, level}:Types.SearchOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const setKeywords = keywords.join();
        // make a fetch request to the api
        if(level === undefined) level = '';
        const url = 'https://www.themuse.com/api/public/jobs?category=Software%20Engineer&' + locations.reduce((str, l) => str + 'location=' + l + '&', '') + 'level=' + level + '&page=' + page;
        console.log('Requesting date from Muse: ' + url);
        const jobs = await fetch(url).then(res => res.json());
        console.log('Received data from Muse = ', jobs.results?.length);
        if(!jobs.results) throw JSON.stringify(jobs);
        
        // iterate over items
        const parsedJobs = jobs.results.map(j => {
          // convert format to result format and give it a score
          return {
              title: j.name,
              location: j.locations[0],
              description: j.contents,
              link: j.refs.landing_page,
              companyName: j.company.name,
              keywords: setKeywords,
              apiWebsite: 'muse',
              apiId: j.id.toString(),
              score: JobAPI.score(j.contents, keywords),
          }
        });

        // resolve with the items
        resolve(parsedJobs);
      }
      catch(error) {
        reject('[Muse] ' + error);
      }
    });
  }

  getItem(id:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = 'https://www.themuse.com/api/public/jobs/' + id;
        const job = await fetch(url).then(res => res.json());
        if(job.error) throw JSON.stringify(job);
        resolve({
          title: job.name,
          location: job.locations[0],
          description: job.contents,
          link: job.refs.landing_page,
          companyName: job.company.name,
          apiWebsite: 'muse',
          apiId: job.id.toString(),
        });
      }
      catch(error) {
        reject('[Muse] ' + error);
      }
    });
  }
}