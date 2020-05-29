import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MaterialModule } from '../shared/material.module';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    SearchComponent
  ],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule,
    MaterialModule,
    ComponentsModule
  ],
})
export class PagesModule {}
