import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../services/shared/http.service';
import { environment } from '../../../../../environments/environment';
import urljoin from 'url-join';

@Injectable()
export class SettingService extends HttpService {
  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/setting');
  }
}
