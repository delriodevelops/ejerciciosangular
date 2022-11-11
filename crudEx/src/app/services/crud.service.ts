import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  url = 'http://localhost:3000';
  private _users = new Subject<User[]>();
  users$ = this._users.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/countries`);
  }
  postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, user);
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/users/${id}`);
  }
  putUser(user: User) {
    return this.http.put<User>(`${this.url}/users/${user.id}`, user);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  setUsers() {
    this.getUsers()
      //Como buena práctica eliminar la contraseña al traer los usuarios
      .pipe(switchMap((users) => [users.map(({ password, ...user }) => user)]))
      .subscribe({
        next: (users) => this._users.next(users),
      });
    return this.users$;
  }
}
