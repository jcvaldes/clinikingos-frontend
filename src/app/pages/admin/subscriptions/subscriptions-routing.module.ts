import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyTokenGuard, LoginGuard } from '../../../services/service.index';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { SubscriptionListResolverGuard } from './subscription-list/subscription-list-resolver.guard';
import { SubscriptionSingleResolverGuard } from './subscription-detail/subscription-single-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Subscriptiones' },
    children: [
      // tslint:disable-next-line: max-line-length
      {
        path: '',
        component: SubscriptionListComponent,
        runGuardsAndResolvers: 'always',
        resolve: { subscriptions: SubscriptionListResolverGuard }
      },
      { path: 'new', component: SubscriptionDetailComponent },
      { path: ':id', component: SubscriptionDetailComponent, resolve: { role: SubscriptionSingleResolverGuard } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
