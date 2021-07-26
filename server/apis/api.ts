export default abstract class JobAPI {
  constructor(name:string) {
    if(Object.keys(JobAPI.list).includes(name)) {
      throw new Error('Two APIs have the same name: ' + name)
    }
    JobAPI.list[name] = this;
  }

  abstract search(page:number, locations:string[], keywords:string[]): Promise<any>;
  abstract getItem(id:number): Promise<any>;

  static score(text:string, keywords:string[]):number {
    const words = text.split(' ');
    let count = 0;
    words.forEach(w => {
      keywords.forEach((k, i) => {
        if(w.search(k) > -1) {
          count += keywords.length - i;
        }
      });
    });

    return count;
  }

  static list:{ [index: string]: JobAPI } = {};
}