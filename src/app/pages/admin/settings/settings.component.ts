import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SettingService } from './services/setting.service';
import { Setting } from './setting.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  settingsSubscription: Subscription = new Subscription();
  constructor(public _settingService: SettingService) { }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        id: new FormControl(null),
        phone: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        facebook: new FormControl(null, Validators.required),
        twitter: new FormControl(null, Validators.required),
      },
    );
    this.populateForm();
  }
  ngOnDestroy(): void {
    if(this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this._settingService.update<Setting>(this.form.value).subscribe(
        (role) => {
          Swal.fire({
            title: 'Ajustes',
            text: 'Los datos han sido guardados :)',
            icon: 'success',
            timer: 1500
          });
        },
        (err) => {
          Swal.fire({
            title: 'Ajustes',
            text: err || 'Ha habido un error y no se pudo guardar',
            icon: 'error',
            timer: 3000
          });
        },
      );
    }
  }
  populateForm() {
    this.settingsSubscription = this._settingService
      .getAll<Setting>()
      .subscribe((res: any) => {
        debugger
        this.form.setValue(res[0]);
      }, err => {
        Swal.fire({
          title: 'Ajustes',
          text: err || 'Ha habido un error y no se pudo guardar',
          icon: 'error',
          timer: 3000
        });
      });
  }
}
