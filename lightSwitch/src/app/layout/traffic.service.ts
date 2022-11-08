import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrafficService {
  timer: any;
  colors = ['red', 'amber', 'green', ''];
  i: number = 0;
  lightColor$ = new Subject<string>();

  switcherValue$ = new Subject<boolean>();
  // switcherValue$ = this._switcherValue.asObservable();

  constructor() {}

  switcher(isOn: boolean) {
    if (!!isOn) {
      this.timer = setInterval(() => {
        this.lightColor$.next(this.colors[this.i]);
        this.i++;
        if (this.i === 4) {
          this.i = 0;
          this.switcherValue$.next(false);
          clearInterval(this.timer);
        }
      }, 500);
    } else {
      this.switcherValue$.next(false);
      clearInterval(this.timer);
    }
  }
}
