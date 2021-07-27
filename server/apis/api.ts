export default abstract class JobAPI {
  constructor(name:string) {
    if(Object.keys(JobAPI.list).includes(name)) {
      throw new Error('Two APIs have the same name: ' + name)
    }
    JobAPI.list[name] = this;
  }

  abstract search(page:number, locations:string[], keywords:string[]): Promise<any>;
  abstract getItem(id:string): Promise<any>;

  static score(text:string, keywords:string[]):number {
    const words = text.toLowerCase().split(' ');
    let count = 0;
    words.forEach(w => {
      keywords.map(k => k.toLowerCase()).forEach((k, i) => {
        if(w.search(k) > -1) {
          count += keywords.length - i;
        }
      });
    });

    return count;
  }

  static list:{ [index: string]: JobAPI } = {};
}