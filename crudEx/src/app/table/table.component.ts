import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Input() data: User[] = [];
  displayedColumns: string[] = [
    'username',
    'email',
    'suscrito',
    'pais',
    'ciudad',
    'actions',
  ];

  constructor(private crud: CrudService) {}

  ngOnInit(): void {}

  onEdit(id: number) {
    this.edit.emit(id);
  }

  delete(id: number) {
    this.crud.deleteUser(id).subscribe(() =>
      this.crud.setUsers().subscribe({
        next: (users) => (this.data = users),
      })
    );
  }
}
