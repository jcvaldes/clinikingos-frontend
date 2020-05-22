import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableDataSource } from '../../../../components/datasource.component';
import { Subscription } from '../subscription.model';
import { SubscriptionService } from '../services/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionListResolverGuard implements Resolve<TableDataSource<Subscription>>  {
  private dataSource: TableDataSource<Subscription>;
  constructor(private _subscriberService: SubscriptionService) {}
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Subscription> | Observable<TableDataSource<Subscription>> | Promise<TableDataSource<Subscription>> {
    this.dataSource = new TableDataSource(this._subscriberService);
    const filter: string = route.queryParamMap.get('filter') || '';
    const pageIndex: number = +route.queryParamMap.get('pageIndex') || 0;
    const pageSize: number = +route.queryParamMap.get('pageSize') || 10;
    return this.dataSource.load(filter, 'id', 'asc', pageIndex, pageSize).then(() => {
      return this.dataSource;
    });
  }
}
