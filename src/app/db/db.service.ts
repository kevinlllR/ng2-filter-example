import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DbService implements InMemoryDbService {
  createDb() {
    let users = new Array(100).fill(0).map(
      (item,index)=>{return {id:index,name:`Test${index}`}})
    return {users};
  }
}