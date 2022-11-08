import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  constructor(private crud: CrudService) {}
  displayedColumns: string[] = [
    'username',
    'email',
    'suscrito',
    'pais',
    'ciudad',
    'actions',
  ];
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Input() data: User[] = [];

  onEdit(id: number) {
    this.edit.emit(id);
  }
  delete(id: number) {
    console.log('borrar:', id);
    this.crud.deleteUser(id).subscribe((res) => this.getUsers());
  }
  getUsers() {
    this.crud
      .getUsers()
      .pipe(
        switchMap((obj) => {
          return [obj.map(({ password, ...obj }) => obj)];
        })
      )
      .subscribe((obj: User[]) => {
        this.data = obj;
      });
  }
  ngOnInit(): void {}
}
