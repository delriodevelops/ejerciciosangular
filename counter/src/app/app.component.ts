import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Counter } from './counter.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'counter';
  counter!: Counter;
  constructor(private service: AppService) {}
  ngOnInit() {
    this.service.counter$.subscribe({
      next: (count) => (this.counter = count),
    });
  }
  start() {
    this.service.startPause(true);
  }
  pause() {
    this.service.startPause(false);
  }
  reset() {
    this.service.reset();
  }
  setCountUp(bool: boolean) {
    this.service._initCounter.countUp = bool;
  }
  value: number = 0;
  setValue() {
    this.service._initCounter.value = this.value;
  }
  incrementValue: number = 2;
  setIncrementValue() {
    this.service._initCounter.incrementValue = this.incrementValue;
  }
}
