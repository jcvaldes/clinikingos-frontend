import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { NotificationService } from '../../../shared/notification.service';
import { HttpService } from '../../../services/service.index';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { RolesModule } from '../roles/roles.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    UsersRoutingModule,
    RolesModule,
    ComponentsModule,
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserDetailComponent
  ],
  providers: [HttpService, NotificationService],
  entryComponents: []
})
export class UsersModule {}
