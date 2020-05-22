import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { NotificationService } from '../../../shared/notification.service';
import { HttpService } from '../../../services/service.index';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ComponentsModule } from '../../../components/components.module';
import { SettingService } from './services/setting.service';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  exports: [
  ],
  providers: [SettingService],
  entryComponents: []
})
export class SettingsModule {}
