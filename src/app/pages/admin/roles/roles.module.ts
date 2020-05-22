import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { NotificationService } from '../../../shared/notification.service';
import { HttpService } from '../../../services/service.index';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleSearchComponent } from './role-search/role-search.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,
  ],
  declarations: [
    RolesComponent,
    RoleListComponent,
    RoleDetailComponent,
    RoleSearchComponent
  ],
  exports: [
    RoleSearchComponent,
  ],
  providers: [HttpService, NotificationService],
  entryComponents: []
})
export class RolesModule {}
