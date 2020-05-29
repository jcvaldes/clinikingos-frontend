import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';
import { LoginGuard } from './../services/guards/login.guard';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Dashboard'}
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Ajustes de Temas'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Perfil de usuario'}
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Buscador'}
  },
  // Mantenimientos
  {
    path: 'settings',
    loadChildren: () => import('./admin/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./admin/users/users.module').then(m => m.UsersModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'roles',
    loadChildren: () => import('./admin/roles/roles.module').then(m => m.RolesModule),
    canActivate: [LoginGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
