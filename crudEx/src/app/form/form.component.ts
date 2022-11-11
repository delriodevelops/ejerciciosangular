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
  data: User[] = [];
  customError: string | boolean = false;
  countries: string[] = [];
  myForm!: any;
  user: User = {
    username: '',
    email: '',
    suscrito: false,
    pais: '',
    ciudad: '',
  };

  constructor(private fb: FormBuilder, private crud: CrudService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: [, [Validators.required]],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(6)]],
      confirm: [, [Validators.required]],
      suscrito: [false],
      pais: [, [Validators.required]],
      ciudad: [, [Validators.required]],
    });

    this.crud.setUsers().subscribe({
      next: (res) => (this.data = res),
    });

    this.crud.getCountries().subscribe((arr) => (this.countries = arr));
    this.myForm.reset({ ...this.user, confirm: this.user.password });
  }

  save() {
    //Validar que confirma la contraseña
    if (
      this.myForm.get('password')?.value !== this.myForm.get('confirm')?.value
    ) {
      this.customError = 'Las contraseñas no coinciden...';
      return;
    }

    //Evaluar si el usuario está registrado(si tiene id) para enviar un post o un put
    delete this.myForm['confirm'];
    if (!this.user.id) {
      const newUser = {
        ...this.myForm.value,
        id: this.user.id,
      };

      this.crud
        .postUser(newUser)
        .subscribe({ next: () => this.crud.setUsers() });
    } else {
      this.crud
        .putUser(this.myForm.value)
        .subscribe({ next: () => this.crud.setUsers() });
    }
    this.myForm.reset();
  }

  changeUser(id: number) {
    this.crud.getUserById(id).subscribe(({ password, ...user }) => {
      this.myForm.reset({ ...user, confirm: password, password: password });
      this.user = { ...user, password };
    });
  }

  validateField(field: string) {
    this.customError = false;
    if (this.myForm.get(field)?.touched && this.myForm.get(field)?.invalid) {
      return true;
    }
    return false;
  }
}
