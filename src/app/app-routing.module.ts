import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileDetailsComponent } from './profile-page/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'profile/:detailsLabel',
    component: ProfileDetailsComponent
  },
  {
    path: 'timeline',
    component: TimelinePageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'cricket',
    loadChildren: () => import('./cricket-view/index').then(m => m.CricketModule)
  },
  {
    path: 'covid-19',
    loadChildren: () => import('./covid19/index').then(m => m.Covid19Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
