import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { IMovie } from '../../../interfaces/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  private favoriteService = inject(FavoriteService);

  @Input() movie: IMovie = {};
  private imageBaseUrl = 'https://image.tmdb.org/t/p';

  addFavorite() {
    this.favoriteService.addFavorite(this.movie);
  }

  removeFavorite() {
    this.favoriteService.removeFavorite(this.movie.id!);
  }

  isFavorite() {
    return this.favoriteService.isFavorite(this.movie.id!);
  }

  getImage() {
    return this.movie.userMovie
      ? this.movie.backdrop_path
      : `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
  }
}
