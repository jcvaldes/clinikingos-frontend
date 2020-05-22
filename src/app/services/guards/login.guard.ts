import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';


@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private _userService: UserService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot) {
    return this.checkLogging(state.url);
  }
// tslint:disable-next-line: max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.canActivate(childRoute, state);
  }
  // tslint:disable-next-line: max-line-length
  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const url = '/${route.path}';
    return this.checkLogging(url);
  }
  checkLogging(url: string) {
    if ( this._userService.isLoggedIn(url)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
