import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IMovie } from '../../../interfaces/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FavoriteService } from '../../services/favorite.service';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewMovieDialogComponent } from '../../components/new-movie-dialog/new-movie-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [MovieCardComponent, MatIcon, MatButtonModule, RouterModule],
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css'],
})
export class MyFavoritesComponent implements OnInit, OnDestroy {
  private favoriteService = inject(FavoriteService);
  private subscription: Subscription | undefined;
  public movies: IMovie[] = [];
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.subscription = this.favoriteService.favoriteMovies$.subscribe(
      (movies) => {
        this.movies = movies;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  newMovie() {
    const dialogRef = this.dialog.open(NewMovieDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = Date.now();
        result.userMovie = true;
        this.favoriteService.addFavorite(result);
      }
    });
  }

  editMovie(movie: IMovie) {
    const dialogRef = this.dialog.open(NewMovieDialogComponent, {
      width: '400px',
      data: movie,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.favoriteService.updateMovie(
          result.id,
          result.title,
          result.overview,
          result.backdrop_path
        );
      }
    });
  }
}
