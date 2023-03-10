import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlClass } from 'src/app/shared/urls';
import { Movie } from '../models/movie.model';


@Injectable({providedIn:'root'})
export class MovieService {
  private url = UrlClass.client_url;;
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.url}/movies`);
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.url}/movies/${id}`);
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie>(`${this.url}/movies`, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put<Movie>(`${this.url}/movies/${movie.id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete<Movie>(`${this.url}/movies/${id}`);
  }
}
