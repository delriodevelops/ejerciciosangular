import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { map, switchMap } from 'rxjs';
import { DayData } from './day.interface';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  constructor(private http: HttpClient) {}

  getByState() {
    return this.http.get(
      'https://api.covidtracking.com/v1/states/current.json'
    );
  }

  getByStateFiltered() {
    return this.getByState().pipe(
      switchMap((data: any) => {
        return [
          data
            .map(({ state, positiveTestsViral }: any) => ({
              state,
              positiveTestsViral,
            }))
            .filter((obj: any) => !!obj.positiveTestsViral),
        ];
      })
    );
  }

  getUsaTotal() {
    return this.http.get('https://api.covidtracking.com/v1/us/daily.json');
  }

  getUsaTotalFiltered() {
    return this.getUsaTotal().pipe(
      switchMap((data: any) => {
        return [data.map(({ date, positive }: any) => ({ date, positive }))];
      })
    );
  }
}
