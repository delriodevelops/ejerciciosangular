import { Component, OnInit } from '@angular/core';
import { TrafficService } from '../traffic.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styles: [
    `
      .semaforo {
        background: #222;
        color: #fff;
        border-radius: 24px;
        width: fit-content;
      }
      .light {
        background: #666;
        padding: 0;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin: 24px auto;
      }
      .red {
        background: #a00;
      }
      .amber {
        background: #fa0;
      }
      .green {
        background: #0a0;
      }
    `,
  ],
})
export class LightComponent implements OnInit {
  activeColor: string = '';

  constructor(private traffic: TrafficService) {}

  ngOnInit(): void {
    this.traffic.lightColor$.subscribe({
      next: (color) => (this.activeColor = color),
    });
  }

  controllerSwitch(val: any) {
    this.traffic.switcher(val);
  }
}
