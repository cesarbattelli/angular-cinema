import { Routes } from '@angular/router';
import { MyFavoritesComponent } from './pages/my-favorites/my-favorites.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'top-rated',
    pathMatch: 'full',
  },
  { path: 'top-rated', component: TopRatedComponent },
  { path: 'my-favorites', component: MyFavoritesComponent },
];
