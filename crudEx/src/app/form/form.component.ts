import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(private fb: FormBuilder, private crud: CrudService) {}
  save() {
    if (
      this.myForm.get('password')?.value !== this.myForm.get('confirm')?.value
    ) {
      this.customError = 'Las contraseñas no coinciden...';
      return;
    }
    const newUser = { ...this.myForm.value, registered: true };
    this.crud.postUser(newUser).subscribe({ next: () => this.crud.setUsers() });
    this.myForm.reset();
  }
  edit() {
    if (
      this.myForm.get('password')?.value !== this.myForm.get('confirm')?.value
    ) {
      this.customError = 'Las contraseñas no coinciden...';
      return;
    }
    const newUser = {
      ...this.myForm.value,
      registered: true,
      id: this.user.id,
    };
    this.crud.putUser(newUser).subscribe({ next: () => this.crud.setUsers() });
    this.myForm.reset();
  }
  data: User[] = [];

  getUsers() {
    this.crud
      .getUsers()
      .pipe(
        switchMap((obj) => {
          return (this.data = obj.map(({ password, ...obj }) => obj));
        })
      )
      .subscribe((obj) => {});
  }

  customError: string | boolean = false;

  changeUser(id: number) {
    this.crud.getUserById(id).subscribe(({ ...res }) => {
      this.myForm.reset({ ...res, confirm: res.password });
      this.user = res;
    });
  }

  validateField(field: string) {
    this.customError = false;
    if (this.myForm.get(field)?.touched && this.myForm.get(field)?.invalid) {
      return true;
    }

    return false;
  }

  countries: string[] = [];

  user: User = {
    username: '',
    email: '',
    suscrito: false,
    pais: '',
    ciudad: '',
    registered: false,
  };

  myForm!: any;

  ngOnInit(): void {
    this.crud.setUsers().subscribe({
      next: (res) => (this.data = res),
    });

    this.myForm = this.fb.group({
      username: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(6)]],
      confirm: [, [Validators.required]],
      suscrito: [false],
      pais: [, [Validators.required]],
      ciudad: [, [Validators.required]],
    });
    this.crud.getCountries().subscribe((arr) => (this.countries = arr));
    this.myForm.reset({ ...this.user, confirm: this.user.password });
  }
}
