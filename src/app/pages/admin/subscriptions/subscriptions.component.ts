import {
  Component,
  OnInit,
} from '@angular/core';

import { HttpService } from '../../../services/service.index';
import { ViewChild } from '@angular/core';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  createdSubscription() {
    this.router.navigate(['subscriptions']);
    // this.redirectTo('subscriptions');
  }
  // redirectTo(uri:string){
  //   this.router.navigateByUrl('/SubscriptionsComponent', {skipLocationChange: true}).then(()=>
  //   this.router.navigate([uri]));
  // }
}
