import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then( m => m.HomePage)
  },

  {
    path: 'site',
    loadComponent: () => import('./features/site/site.page').then( m => m.SitePage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./features/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'soussite',
    loadComponent: () => import('./features/soussite/soussite.page').then( m => m.SoussitePage)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },




];
