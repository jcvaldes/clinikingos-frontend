import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TableDataSource } from '../../../../components/datasource.component';
import { UserService } from '../../../../services/service.index';
import { NotificationService } from '../../../../shared/notification.service';
import Swal from 'sweetalert2';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  dataSource: TableDataSource<User>;
  dataExport: TableDataSource<User>;
  displayedColumns: string[] = [
    'fullname',
    'lastname',
    'email',
    'createdAt',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private _userService: UserService
  ) {
    // this.dataSource = this.route.snapshot.data['users'];
    this.route.data.subscribe((data: {users: TableDataSource<User>}) => {
      this.dataSource = data.users;
    });
  }

  ngOnInit() {
    // this.dataSource = this.route.snapshot.data['users'];
    this.filter = '';
  }
  onCreate() {
    const dialogRef = this.dialog.open(
      UserDetailComponent,
      this.dialogConfig(),
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUserPage();
      }
    });
  }
  onEdit(row) {
    const dialogRef = this.dialog.open(
      UserDetailComponent,
      this.dialogConfig(row),
    );
    dialogRef.afterClosed().subscribe(() => {
      this.loadUserPage();
    });
  }
  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de desactivar un Usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Desactivar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this._userService.delete<User>(id).subscribe(
          () => {
            this.notificationService.success(
              'El usuario seleccionado ha sido Eliminado',
            );
            this.loadUserPage();
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
      this.loadUserPage();
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
          this.loadUserPage();
          this.filter = this.input.nativeElement.value;
        }),
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.pipe(tap(() => {
    //   debugger
    //   this.loadUserPage();
    // })).subscribe();
    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => {
        this.loadUserPage();
      }))
      .subscribe();
  }
  loadUserPage() {
    this.router.navigated = false;
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/users'],
      { queryParams:
        {
          filter: this.input.nativeElement.value,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        }
      }).then(() => {
        // console.log(this.route.snapshot.data.users);
      });
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
    dialogConfig.width = '700px';
    dialogConfig.data = data || null;
    return dialogConfig;
  }
}
