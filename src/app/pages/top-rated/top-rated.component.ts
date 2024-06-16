import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IMovie } from '../../../interfaces/common';
import { catchError, finalize } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MovieCardComponent,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css',
})
export class TopRatedComponent implements OnInit {
  private movieService = inject(MovieService);
  public currentPage = 1;
  public movies: IMovie[] = [];
  public totalPages = 0;
  public isLoading = true;
  public error = null;

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(page = 1) {
    this.error = null;
    this.isLoading = true;
    this.movieService
      .getTopRatedMovies(page)
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
          this.movies = res.results;
          this.totalPages = res.total_pages;
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.loadMovies(this.currentPage);
  }
}
