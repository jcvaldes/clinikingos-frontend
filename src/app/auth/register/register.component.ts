import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/service.index';
import { User } from '../../pages/admin/users/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  comparePasswords(field1: string, field2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return ( group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if ( pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
        conditions: new FormControl(false)
      },
      { validators: this.comparePasswords('password', 'confirmPassword') }
    );

    this.form.setValue({
      name: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      conditions: true
    });
  }

  register() {
    if  ( this.form.invalid ) {
      return;
    }
    if  ( !this.form.value.conditions ) {
      Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    // console.log(this.form.valid);
    // console.log(this.form.value);
    let user = new User(
      this.form.value.name,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.password
    );
    this._userService
      .newUser(user)
      .subscribe(response => this.router.navigate(['/login']));
  }
}
