import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favoriteMovies';
  private favoriteMoviesSubject = new BehaviorSubject<IMovie[]>(
    this.getFavoriteMovies()
  );
  public favoriteMovies$ = this.favoriteMoviesSubject.asObservable();

  constructor() {}

  getFavoriteMovies(): IMovie[] {
    const movies = localStorage.getItem(this.storageKey);
    return movies ? JSON.parse(movies) : [];
  }

  private saveFavoriteMovies(movies: IMovie[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
    this.favoriteMoviesSubject.next(movies);
  }

  isFavorite(movieId: number): boolean {
    const movies = this.getFavoriteMovies();
    return movies.some((movie) => movie.id === movieId);
  }

  updateMovie(
    movieId: number,
    title: string,
    personalOverview: string,
    image: string,
    userMovie?: boolean
  ): void {
    const movies = this.getFavoriteMovies();
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    if (movieIndex !== -1) {
      movies[movieIndex].title = title;
      movies[movieIndex].overview = personalOverview;
      movies[movieIndex].backdrop_path = image;
      movies[movieIndex].userMovie = userMovie;
      this.saveFavoriteMovies(movies);
    }
  }

  addFavorite(movie: IMovie | null): void {
    if (movie) {
      const movies = this.getFavoriteMovies();
      if (!this.isFavorite(movie.id!)) {
        movies.push(movie);
        this.saveFavoriteMovies(movies);
      }
    }
  }

  removeFavorite(movieId: number): void {
    let movies = this.getFavoriteMovies();
    movies = movies.filter((movie) => movie.id !== movieId);
    this.saveFavoriteMovies(movies);
  }

  getFavoriteMovieByID(movieId: number): IMovie | null {
    const movies = this.getFavoriteMovies();
    return movies.find((movie) => movie.id === movieId) || null;
  }
}
