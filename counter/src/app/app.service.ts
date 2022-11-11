import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Counter } from './counter.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  interval: any;
  _initCounter: Counter = {
    counting: false,
    countUp: true,
    countValue: 0,
    value: 0,
    speed: 1000,
    incrementValue: 2,
  };
  counter$ = new BehaviorSubject<Counter>(this._initCounter);

  constructor() {}

  startPause(bool: boolean) {
    if (bool) {
      this._initCounter.counting = true;

      this.interval = setInterval(() => {
        if (this._initCounter.countUp) {
          this._initCounter.countValue =
            this._initCounter.countValue + this._initCounter.incrementValue;
        } else {
          this._initCounter.countValue =
            this._initCounter.countValue - this._initCounter.incrementValue;
        }
      }, this._initCounter.speed);
    } else {
      this._initCounter.counting = false;
      clearInterval(this.interval);
    }
  }

  reset() {
    clearInterval(this.interval);
    this._initCounter.countValue = this._initCounter.value;
  }

  setCountUp(bool: boolean) {
    this._initCounter.countUp = bool;
  }
}
