import { Component, OnInit } from '@angular/core';
import { ComboSearchComponent } from '../../../../components/combo-search/combo-search.component';
import { HttpService } from '../../../../services/service.index';
import { UserService } from '../../../../services/user/user.service';
import { Role } from '../role.model';
import _ from 'lodash';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.scss']
})
export class RoleSearchComponent extends ComboSearchComponent<Role> {
  selected: string;
  constructor(public _httpService: HttpService, userService: UserService ) {
    super(_httpService, '/api/role', false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].rolename;
  }
}
