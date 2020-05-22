import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
// Dictionaries for spanish and Russian languages

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( public _ajustesService: SettingsService) {

  }
}
