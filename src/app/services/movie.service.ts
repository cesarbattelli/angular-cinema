import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResponse, IMovie } from '../../interfaces/common';
import { HttpClient } from '@angular/common/http';

const MOVIES_DB_URL = environment.movieDBURL;
const MOVIES_DB_API_KEY = environment.movieDBKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies(page = 1): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${MOVIES_DB_URL}/movie/popular?page=${page}&api_key=${MOVIES_DB_API_KEY}`
    );
  }

  getMovieDetails(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${MOVIES_DB_URL}/movie/${id}?api_key=${MOVIES_DB_API_KEY}`
    );
  }
}
