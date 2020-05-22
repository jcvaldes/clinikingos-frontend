import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../services/shared/http.service';
import { UserService } from '../../../../services/user/user.service';
import { Role } from '../role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleSingleResolverGuard implements Resolve<Role>  {
  constructor(private httpService: HttpService, private userService: UserService) {
    this.httpService.url = `/api/role`;
  }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Role | Observable<Role> | Promise<Role> {
    const id: number = +route.paramMap.get('id');
    return this.httpService.getSingle(id);
  }
}
