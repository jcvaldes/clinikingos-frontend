import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, distinctUntilChanged } from 'rxjs/operators';
import { ContractService } from './contract.service';


export class TableDataSource<T> implements DataSource<T> {
  payloadSubject = new BehaviorSubject<T[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public payload: T[];
  // indicador de carga
  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();
  constructor(private _contractService: ContractService) {}
  load(
  ) {
    return new Promise((resolve, reject) => {
      this.loadingSubject.next(true);
      this._contractService.getContracts()
        .pipe(
          catchError(() => of([])),
          finalize(() => {
            this.loadingSubject.next(false);
          })
        )
        .subscribe(res => {
         // this.payload = res['payload'];
          this.payloadSubject.next(res);
          this.countSubject.next(res.length);
          resolve(this.payloadSubject);
        });
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('Connecting data source');
    return this.payloadSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.payloadSubject.complete();
    this.loadingSubject.complete();
  }
}
