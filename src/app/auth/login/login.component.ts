import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/service.index';
import { User } from '../../pages/admin/users/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { DesactivarLoadingAction, ActivarLoadingAction } from '../../shared/ui.actions';
import Swal from 'sweetalert2';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;
  email: string;
  rememberme = false;
  auth2: any;
  constructor(
    public router: Router,
    public _userService: UserService,
    public _locker: SessionStorageService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
    this.subscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ingresar(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.store.dispatch(new ActivarLoadingAction());
    const user = new User(null, null, f.value.email, f.value.password);
    this._userService.login(user, f.value.rememberme)
      .subscribe(
        response => this.router.navigate(['/dashboard']),
        err => {
          if (err.error.errors) {
            Swal.fire('Error', err.error.errors, 'error');
          } else {
            Swal.fire('Error', err.message, 'error');
          }
        });
  }
}


