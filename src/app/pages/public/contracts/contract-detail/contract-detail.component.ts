import { FileItem } from '../../../../models/file-item';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { HttpService } from '../../../../services/service.index';
import { NotificationService } from '../../../../shared/notification.service';
import urlJoin from 'url-join';
import { Subscription, Observable } from 'rxjs';
import { Contract } from '../contract.model';
import * as ClassicEditor from '../../../../../assets/plugins/ckeditor5/ckeditor';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

import { UploadAdapter } from './UploadAdapter';
import { config } from '../../../../shared/material.module';
import { ContractService } from '../services/contract.service';

declare var $: any;
@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit, OnDestroy {
  files: FileItem[] = [];
  url = '';
  hasPdf = false;
  estaSobreElemento = false;
  contract: Contract;
  contractSubscription: Subscription = new Subscription();
  editorData = '<p>hola</p>';

  public editor = ClassicEditor;
  public onReady(event) {
    event.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      event.ui.getEditableElement().parentElement.insertBefore(
        event.ui.view.toolbar.element,
        event.ui.getEditableElement()
      );
      return new UploadAdapter(loader);
    };
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    // description: new FormControl('', Validators.required),
    // active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ContractDetailComponent>,
    public _contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    debugger
    if (data) {
      this.populateForm(data);
    }
  }

  limpiarArchivos() {
    this.files = [];
  }
  ngOnDestroy() {
    this.contractSubscription.unsubscribe();
  }
  ngOnInit() { }

  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  // onSelect(event) {
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  // }

  // onRemove(event) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }
  onSubmit() {
    // this._contractService.url = '/api/contract';
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        // debugger
        this._contractService.fileUploadFirebase(this.files, { title: this.form.get('title').value }).then(data => {
          this.notificationService.success(':: El contrato ha sido creado');
          this.onClose(true);

          // this._contractService.add<Contract>(payload).subscribe(
          //   (resp: any) => {
          //     this.notificationService.success(':: El contrato ha sido creado');
          //     this.onClose(true);
          //   },
          //   (err) => {
          //     debugger
          //     this.notificationService.error(`:: ${err}`);
          //   },
          // );
        }).catch(err => this.notificationService.error(`:: ${err}`));
      } else {
        // this._contractService.update<Contract>(this.form.value).subscribe(
        //   (contract) => {
        //     this.notificationService.success(
        //       ':: El contrato ha sido actualizado',
        //     );
        //     this.onClose(true);
        //   },
        //   (err) => {
        //     this.notificationService.error(`:: ${err}`);
        //   },
        // );
      }
    }
  }
  populateForm(data) {
    this.form.setValue(
      _.omit(data, ['url', 'createdAt', 'updatedAt', 'fileName'])
    );
  }
  onRemoveFile() {
    this.hasPdf = false;
    debugger
    this._contractService.fileRemoveFirebase('').then(data => { });
  }
}
