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
    path: 'local',
    loadComponent: () => import('./features/local/local.page').then( m => m.LocalPage)
  },
  {
    path: 'souslocal',
    loadComponent: () => import('./features/souslocal/souslocal.page').then( m => m.SouslocalPage)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },

];
