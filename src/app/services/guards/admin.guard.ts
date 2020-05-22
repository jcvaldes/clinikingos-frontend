import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public _userService: UserService) {}
  canActivate() {
    let roles = this._userService.user.roles;
    if (containsAdminRole(roles) >= 0) {
      return true;
    } else {
      this._userService.logout();
      return false;
    }
  }
}
function containsAdminRole(roles) {
  return roles.findIndex(role => role.rolename === 'Administrador');
}
