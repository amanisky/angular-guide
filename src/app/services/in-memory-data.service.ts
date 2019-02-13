import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // angular-in-memory-web-api 的配置项
  // {
  //   "caseSensitiveSearch": false,
  //   "dataEncapsulation": false,
  //   "delay": 500,
  //   "delete404": false,
  //   "passThruUnknownUrl": false,
  //   "post204": true,
  //   "post409": false,
  //   "put204": true,
  //   "put404": false,
  //   "host": "localhost",
  //   "rootPath": "/"
  // }

  constructor() { }

  createDb() {
    const heroes = [
      { id: 1, name: 'Mr. Nice' },
      { id: 2, name: 'Narco' },
      { id: 3, name: 'Bombasto' },
      { id: 4, name: 'Celeritas' },
      { id: 5, name: 'Magneta' },
      { id: 6, name: 'RubberMan' },
      { id: 7, name: 'Dynama' },
      { id: 8, name: 'Dr IQ' },
      { id: 9, name: 'Magma' },
      { id: 10, name: 'Tornado' }
    ];
    return { heroes };
  }

  /**
   * 覆盖 genId 方法确保英雄始终具有 id 属性
   * 参考：https://www.npmjs.com/package/angular-in-memory-web-api#custom-genid
   * @param heroes 传入的英雄数组
   */
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
