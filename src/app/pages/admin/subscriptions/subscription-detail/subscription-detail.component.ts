import { Subscription as Subscriber } from './../subscription.model';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { NotificationService } from '../../../../shared/notification.service';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss']
})
export class SubscriptionDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  permission = [[]];
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<SubscriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _subscriptionService: SubscriptionService,
  ) {
    if (data) {
      // this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() { }
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        this._subscriptionService.add<Subscriber>(this.form.value).subscribe(
          () => {
            this.onClose(true);
            this.notificationService.success(':: La subscripción ha sido creada');
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        this._subscriptionService.update<Subscriber>(this.form.value).subscribe(
          () => {
            this.onClose(true);
            this.notificationService.success(
              ':: La subscripción ha sido actualizada',
            );
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      }
    }
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      description: '',
      active: true,
    });
  }
}
