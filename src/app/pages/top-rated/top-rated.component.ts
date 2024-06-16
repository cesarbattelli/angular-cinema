import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IMovie } from '../../../interfaces/common';
import { catchError, finalize } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [MatPaginatorModule, MovieCardComponent, MatGridListModule],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css',
})
export class TopRatedComponent implements OnInit {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public movies: IMovie[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public isLoading = true;
  public error = null;

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movies.push(...res.results);
          // event?.target.complete();
          // if (event) {
          //   event.target.disabled = res.total_pages === this.currentPage;
          // }
        },
      });
  }
}
