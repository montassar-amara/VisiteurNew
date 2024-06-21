import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () => import('./features/home/home.page').then( m => m.HomePage)
  },

  {
    path: 'site',
    loadComponent: () => import('./features/site/site.page').then( m => m.SitePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/intro/intro.page').then( m => m.IntroPage)
  },

  {
    path: 'local',
    loadComponent: () => import('./features/local/local.page').then( m => m.LocalPage)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
