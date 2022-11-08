import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from './interfaces/user.interface';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crudEx';
}
