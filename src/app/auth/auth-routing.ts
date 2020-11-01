import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            breadcrumb: 'Login',
            title: 'Login'
        }
    }
];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
