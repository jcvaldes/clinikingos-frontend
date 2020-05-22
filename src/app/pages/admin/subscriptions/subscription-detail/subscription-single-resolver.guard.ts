import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from '../../../../services/shared/http.service';
import { UserService } from '../../../../services/user/user.service';
import { Subscription as Subscriptor} from '../subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionSingleResolverGuard implements Resolve<Subscriptor>  {
  constructor(private httpService: HttpService, private userService: UserService) {
    this.httpService.url = `/api/subscription`;
  }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Subscriptor | Observable<Subscriptor> | Promise<Subscriptor> {
    const id: number = +route.paramMap.get('id');
    return this.httpService.getSingle(id);
  }
}
