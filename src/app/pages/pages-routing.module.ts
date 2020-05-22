import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
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
  // {
  //   path: 'categories',
  //   component: CategoriesComponent,
  //   canActivate: [VerifyTokenGuard],
  //   data: { titulo: 'Categorías' }
  // },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'}},
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
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
  {
    path: 'contracts',
    loadChildren: () => import('./public/contracts/contracts.module').then(m => m.ContractsModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./admin/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    canActivate: [LoginGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
