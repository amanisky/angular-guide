import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * 获取英雄列表
   * @returns 返回一个可观察的英雄对象数组
   */
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      // 获取了由 HttpClient 方法返回的 Observable，并把它们通过管道传给错误处理器
      .pipe(
        // RxJS 的 tap 操作符会捕获请求成功了还是失败了
        tap(_ => this.log('fetched heroes')),
        // 优雅地处理 observable 序列中的错误
        catchError(this.handleError('getHeroes', []))
      )
  }

  /**
   * 通过 ID 获取英雄
   * @returns 返回一个可观察的单个英雄对象
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /**
   * 修改英雄
   * @param hero Hero 类型的英雄对象
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {

  }

  /**
   * 处理失败的 Http 操作，让程序能正常运行
   * @param operation - 失败的操作名称
   * @param result - 作为可观察结果返回的可选值
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed：${error.message}`);
      // 类型断言（好比其它语言里的类型转换）
      // 通过返回空结果让应用程序正常运行
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
