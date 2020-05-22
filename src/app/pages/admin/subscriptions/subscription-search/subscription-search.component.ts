import { Component, OnInit } from '@angular/core';
import { ComboSearchComponent } from '../../../../components/combo-search/combo-search.component';
import { HttpService } from '../../../../services/service.index';
import { UserService } from '../../../../services/user/user.service';
import { Subscription } from '../subscription.model';
import _ from 'lodash';

@Component({
  selector: 'app-subscription-search',
  templateUrl: './subscription-search.component.html',
  styleUrls: ['./subscription-search.component.scss']
})
export class SubscriptionSearchComponent extends ComboSearchComponent<Subscription> {
  selected: string;
  constructor(public _httpService: HttpService, userService: UserService ) {
    super(_httpService, '/api/subscription', false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].subscriptionname;
  }
}
