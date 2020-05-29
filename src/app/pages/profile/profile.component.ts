import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../admin/users/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
    `
      p-b-20: {
        padding-bottom: 20px;
      }
    `
  ]
})
export class ProfileComponent implements OnInit {
  user: User;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  constructor(public _userService: UserService) {
    this.user = this._userService.user;
  }

  ngOnInit() {}
  save(user: User) {
    this.user.fullname = user.fullname;
    this.user.email = user.email;
    this._userService.updateUser(this.user).subscribe();
  }
  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }
  changeImage() {
    debugger
    this._userService
      .changeImage(this.imageUpload, this.user.id)
      .then(resp => {
        this.imageUpload = null;
      });
  }
}
