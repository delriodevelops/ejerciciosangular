import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComunicationService } from '../comunication.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
    `
      div:nth-child(1) {
        border: solid 2px #000;
        padding: 48px;
        border-radius: 24px;
      }
    `,
  ],
})
export class ChildComponent implements OnInit {
  @Input() childMsg: string = '';
  @Output() outputFromChild: EventEmitter<string> = new EventEmitter<string>();

  constructor(private comunicationService: ComunicationService) {
    comunicationService.messageParent$.subscribe(
      (msg) => (this.childMsg = msg)
    );
  }

  ngOnInit(): void {}

  Service() {
    this.comunicationService.setMessageFromServiceToChild(
      'Child using service'
    );
  }
  Output() {
    this.outputFromChild.emit('Child using output');
  }
  Observable() {
    this.comunicationService.messageObservableForChild();
  }
}
