import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'site',
    loadComponent: () => import('./features/generic-site/generic-site.component').then( m => m.GenericSiteComponent)
  },
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full',
  },
];
