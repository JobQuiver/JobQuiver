const fetch = require('node-fetch');
import JobAPI from "./api";

/**
 * The Muse
 * Docs: https://www.themuse.com/developers/api/v2
 * Request URL: https://www.themuse.com/api/public/jobs
 */
export default class MuseAPI extends JobAPI {
  constructor() {
    super('muse');
  }

  search(page:number, locations:string[], keywords:string[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const setKeywords = keywords.join();
        // make a fetch request to the api
        const url = 'https://www.themuse.com/api/public/jobs?category=Software%20Engineer&' + locations.reduce((str, l) => str + 'location=' + l + '&', '') + 'page=' + page;
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

  // needs implementation
  getItem(id:number) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}