import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../environments/environment';
import { User } from '../../pages/admin/users/user.model';

import { throwError } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from '../file-upload/file-upload.service';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { SetUserAction, UnsetUserAction } from '../../auth/auth.actions';
import { HttpService } from '../shared/http.service';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from '../../shared/ui.actions';
@Injectable()
export class UserService extends HttpService {
  public urlRedirect = '';
  private loginUrl: string;
  private userUrl: string;
  private loginGoogleUrl: string;
  user: User;
  token: string;
  menu: any = [];
  constructor(
    public http: HttpClient,
    public router: Router,
    public _fileUploadService: FileUploadService,
    private store: Store<AppState>
  ) {
    super(http);
    this.loginUrl = urljoin(environment.apiUrl, '/api/auth');
    this.userUrl = urljoin(environment.apiUrl, '/api/user');
    this.url = this.userUrl;
    this.loadStorage();
  }

  renewToken() {
    const url = urljoin(this.loginUrl, `/renewtoken?token=${this.token}`);
    return this.http
      .get(url)
      .pipe(
        map((response: any) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          console.log('Token renovado');
          return true;
        })
      )
      .pipe(
        catchError(err => {
          this.logout();
          Swal.fire(
            'No se pudo renovar el token',
            'No fue posible renovar el token',
            'error'
          );
          return throwError(err);
        })
      );
  }
  isLoggedIn(url: string) {
    this.urlRedirect = url;
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }
  private saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }
  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    this.store.dispatch( new UnsetUserAction() );
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
  login(user: User, remember: boolean = false) {
    this.store.dispatch(new ActivarLoadingAction());
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http
      .post(this.loginUrl, user)
      .pipe(
        map((response: any) => {
          this.store.dispatch(new DesactivarLoadingAction());
          this.saveStorage(
            response.id,
            response.token,
            response.user,
            response.menu
          );
          this.store.dispatch(new SetUserAction(response.user));
          this.router.navigate(['/dashboard']);
        })
      )
      .pipe(
        catchError(err => {
          this.store.dispatch(new DesactivarLoadingAction());
          return throwError(err);
        })
      );
  }
  newUser(user: User) {
    return this.http
      .post(this.userUrl, user)
      .pipe(
        map((response: any) => {
          Swal.fire('Usuario creado', user.email, 'success');
          return response.user;
        })
      )
      .pipe(
        catchError(err => {
          Swal.fire(err.error.message, err.error.errors.message, 'error');
          return throwError(err);
        })
      );
  }
  updateUser(user: User) {
    let url = this.userUrl + '/' + user.id;
    url += '?token=' + this.token;
    return this.http
      .put(url, user)
      .pipe(
        map((response: any) => {
          if (user.id === this.user.id) {
            let userDb: User = response.user;
            this.saveStorage(userDb.id, this.token, userDb, this.menu);
          }
          Swal.fire('Usuario actualizado', user.fullname, 'success');
          return true;
        })
      )
      .pipe(
        catchError(err => {
          Swal.fire(err.error.message, err.error.errors.message, 'error');
          return throwError(err);
        })
      );
  }
  changeImage(file: File, id: string) {
    return this._fileUploadService
      .fileUpload(file, 'users', id)
      .then((response: any) => {
        this.user.img = response.user.img;
        Swal.fire('Imagen actualizada', this.user.fullname, 'success');
        this.saveStorage(id, this.token, this.user, this.menu);
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }
  loadUsers(from: number = 0) {
    let url = urljoin(this.userUrl, '?from=' + from);
    return this.http.get(url);
  }
  searchUsers(searchText: string) {
    let url = urljoin(
      environment.apiUrl,
      '/search/collection/users/' + searchText
    );
    return this.http.get(url).pipe(map((response: any) => response.users));
  }
  deleteUser(id: string) {
    let url = `${this.userUrl}/${id}`;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      catchError(err => {
        Swal.fire(err.error.message, err.error.errors.message, 'error');
        return throwError(err);
      })
    );
  }
}
