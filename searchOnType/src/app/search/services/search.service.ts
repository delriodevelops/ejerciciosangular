import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { University } from '../interfaces/university.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUniversity(
    query: string,
    alphaTwoCode: string = ''
  ): Observable<University[]> {
    return this.http.get<University[]>(
      `http://localhost:3000/universities/?name_like=${query}&alpha_two_code_like=${alphaTwoCode}`
    );
  }
}
