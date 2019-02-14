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
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
