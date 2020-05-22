import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpService } from '../../../../services/shared/http.service';
import { UserService } from '../../../../services/user/user.service';
import { Contract } from '../contract.model';
import { ContractService } from '../services/contract.service';
import { MatTableDataSource } from '@angular/material/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { TableDataSource } from '../services/datasource';

@Injectable({
  providedIn: 'root'
})
export class ContractListResolverGuard implements Resolve<TableDataSource<Contract>>  {
  private dataSource: TableDataSource<Contract>;
  constructor(private _contractService: ContractService, private router: Router) {}
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Contract> | Observable<TableDataSource<Contract>> | Promise<TableDataSource<Contract>> {
    this.dataSource = new TableDataSource(this._contractService);
    return this.dataSource.load().then((data) => {
      return this.dataSource;
    });
  }
}
