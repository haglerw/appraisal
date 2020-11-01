import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import {AuthGuard} from './shared/helpers';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appraisal/organization-goals',
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
       {
        path: 'appraisal',
        loadChildren: () => import('./appraisal/appraisal.module').then(m => m.AppraisalModule),
        data: { breadcrumb: 'Appraisal' }
      }
     ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  // useHash: true
});
