import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TableDataSource } from '../../../../components/datasource.component';
import { HttpService, UserService } from '../../../../services/service.index';
import { NotificationService } from '../../../../shared/notification.service';
import Swal from 'sweetalert2';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Contract } from '../contract.model';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit, AfterViewInit {
  dataSource: TableDataSource<Contract>;
  dataExport: TableDataSource<Contract>;
  navigationSubscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'title',
    'createdAt',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  files: File[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public _contractService: ContractService
  ) {

  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  ngOnInit() {

    this.route.data.subscribe((data: { contracts: TableDataSource<Contract>} ) => {
      this.dataSource = data.contracts;

    });
    // this.dataSource = this.route.snapshot.data['contracts'];
    this.filter = '';
    // this.paginator._intl.itemsPerPageLabel = 'Ítems por página: ';
    // this.paginator._intl.getRangeLabel = this.spanishRangeLabel;


  }
  onCreate() {
    const dialogRef = this.dialog.open(
      ContractDetailComponent,
      this.dialogConfig(),
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPage('asc');
      }
    });
  }
  onEdit(row) {
    const dialogRef = this.dialog.open(
      ContractDetailComponent,
      this.dialogConfig(row),
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.loadPage(this.sort.direction);
    });
  }
  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de eliminar un contrato',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this._contractService.delete(id).then(
          (resp: any) => {
            this.notificationService.success(
              'El contrato seleccionado ha sido eliminado',
            );
            this.loadPage();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              title: 'Reglas de Validación',
              text: err,
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
              animation: false,
            });
          },
        );
      }
    });
  }
  onSearchClear() {
    if (this.input.nativeElement.value.length > 0) {
      this.input.nativeElement.value = '';
      this.loadPage();
    }
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
          this.filter = this.input.nativeElement.value;
        }),
      )
      .subscribe();
    // reset the paginator after sorting
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.pipe(tap(() => {
    //   debugger
    //   this.loadPage();
    // })).subscribe();
    // on sort or paginate events, load a new page
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(tap(() => {
    //     this.loadPage();
    //   }))
    //   .subscribe();
  }
  loadPage(direction = this.sort.direction) {
    this.router.navigated = false;
    this.router.navigate(['/contracts'], {queryParams: {}});

    // this.dataSource.load(
    //   this.input.nativeElement.value,
    //   this.sort.active,
    //   direction,
    //   this.paginator.pageIndex,
    //   this.paginator.pageSize,
    //   this.userService.token,
    // );
  }


  dialogConfig(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1020px';
    dialogConfig.data = data || null;
    return dialogConfig;
  }
  spanishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}
