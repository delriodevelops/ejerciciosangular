import { Component } from '@angular/core';
import { ComunicationService } from './comunication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `
      .parent {
        border: solid 2px #000;
        border-radius: 24px;
      }
    `,
  ],
})
export class AppComponent {
  childMsg: string = '';
  parentMsg: string = '';
  title = 'componentComunication';
  constructor(public comunicationService: ComunicationService) {
    this.comunicationService.messageChild$.subscribe(
      (msg) => (this.parentMsg = msg)
    );
  }

  input() {
    this.childMsg = 'Parent using input';
  }
  output(msg: string) {
    this.parentMsg = msg;
  }
  service() {
    this.comunicationService.setMessageFromServiceToParent(
      'parent using service'
    );
  }
  observable() {
    this.comunicationService.messageObservableForParent();
  }
}
