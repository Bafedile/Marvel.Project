import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies',
  template: `
    <div style="background: #9C6B6B;">
      <h1
        fxLayoutAlign="center center"
        style="margin:0;height:80px;color:white;"
      >
        {{ title }}
      </h1>
      <ng-container *ngIf="movies">
        <app-movie-item
          *ngFor="let movie of movies | sortDate; let i = index"
          [movie]="movie"
          [order]="i"
        ></app-movie-item>
      </ng-container>
    </div>
  `,
  styles: [``],
})
export class MoviesComponent implements OnInit {
  title = 'Movies';
  @Input() movies: Movie[] | undefined | null;

  constructor() {}
  ngOnInit(): void {}
}
