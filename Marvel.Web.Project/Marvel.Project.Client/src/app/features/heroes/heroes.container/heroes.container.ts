import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { Hero } from './models/hero.model';
import { loadHeroes } from './store/actions';
import { selectEntities, selectHeroes } from './store/selectors';

import * as actions from '../heroes.container/store/actions';
import { HeroService } from './services/heroes.service';

@Component({
  selector: 'app-heroes.container',
  template: ` <app-heroes [heroes]="heroes$ | async" [title]="title"></app-heroes> `,
  styles: [``],
})
export class HeroesContainerComponent {
  // public heroes$: Hero[] | undefined;
  public heroes$: Observable<Hero[] | undefined>;
  title = 'SuperHeroes';

  constructor(private store: Store) {
    this.store.dispatch(actions.loadHeroes());
    this.heroes$ = this.store.select(selectHeroes);

    // this.heroes$ = this.store.select(selectHeroes);
  }
  ngOnInit() {}
}