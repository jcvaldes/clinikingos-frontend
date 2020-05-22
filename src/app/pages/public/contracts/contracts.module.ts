import { environment } from '../../../../environments/environment';
import { NgDropFilesDirective } from '../../../directives/ng-drop-files.directive';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { NotificationService } from '../../../shared/notification.service';
import { HttpService } from '../../../services/service.index';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { RolesModule } from '../../admin/roles/roles.module';
import { ContractsComponent } from './contracts.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ContractsRoutingModule,
    RolesModule,
    ComponentsModule
  ],
  declarations: [
    ContractsComponent,
    ContractListComponent,
    ContractDetailComponent,
    NgDropFilesDirective
  ],
  providers: [HttpService, NotificationService],
  entryComponents: [
    ContractDetailComponent
  ]
})
export class ContractsModule {}
