import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // $ 是一个命名惯例，用来表明 heroes$ 是一个 Observable，而不是数组
  heroes$: Observable<Hero[]>;

  // searchTerms 属性声明成了 RxJS 的 Subject 类型。
  // Subject 既是可观察对象的数据源，本身也是 Observable。
  // 可以像订阅任何 Observable 一样订阅 Subject。
  // 可以通过调用它的 next(value) 方法往 Observable 中推送一些值
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // 将搜索关键字推入可观察流
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //  往 searchTerms 这个可观察对象的处理管道中加入了一系列 RxJS 操作符
    this.heroes$ = this.searchTerms.pipe(
      // 只有在特定的一段时间经过后并且没有发出另一个源值，才从源 Observable 中发出一个值
      debounceTime(300),

      // 返回 Observable，它发出源 Observable 发出的所有与前一项不相同的项
      distinctUntilChanged(),

      // 将每个源值投射成 Observable，该 Observable 会合并到输出 Observable 中， 并且只发出最新投射的 Observable 中的值
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
