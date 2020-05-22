import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './shared/http.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TokenInterceptor } from './interceptors/token.interceptor';

import {
  SettingsService,
  SidebarService,
  UserService,
  LoginGuard,
  AdminGuard,
  VerifyTokenGuard,
  FileUploadService,
  ModalUploadService,
  SearchService,
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    HttpService,
    UserService,
    LoginGuard,
    AdminGuard,
    VerifyTokenGuard,
    FileUploadService,
    ModalUploadService,
    SearchService
  ],
  declarations: []
})
export class ServiceModule { }
