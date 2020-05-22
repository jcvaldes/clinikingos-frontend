import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { NotificationService } from '../../../shared/notification.service';
import { HttpService } from '../../../services/service.index';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionSearchComponent } from './subscription-search/subscription-search.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriptionsRoutingModule,
  ],
  declarations: [
    SubscriptionsComponent,
    SubscriptionListComponent,
    SubscriptionDetailComponent,
    SubscriptionSearchComponent
  ],
  exports: [
    SubscriptionSearchComponent,
  ],
  providers: [HttpService, NotificationService],
  entryComponents: []
})
export class SubscriptionsModule {}
