import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrafficService } from '../traffic.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styles: [
    `
      .strong {
        font-weight: 700;
        font-size: 1.3rem;
      }
    `,
  ],
})
export class ControllerComponent implements OnInit {
  @Output() switchControl: EventEmitter<any> = new EventEmitter();

  activeColor = '';
  switcherValue: boolean = false;

  constructor(private traffic: TrafficService) {}

  ngOnInit(): void {
    this.traffic.lightColor$.subscribe({
      next: (color) => {
        this.activeColor = color;
      },
    });

    this.traffic.switcherValue$.subscribe({
      next: (value) => (this.switcherValue = value),
    });
  }

  OnOff() {
    this.switcherValue = !this.switcherValue;
    this.switchControl.emit(this.switcherValue);
  }
}
