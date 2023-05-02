import { GamesComponent } from './components/games/games.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/games' },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  { path: '**', redirectTo: '/games'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
