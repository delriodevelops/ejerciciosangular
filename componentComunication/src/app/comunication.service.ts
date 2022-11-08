import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  // Service functions
  setMessageFromServiceToParent(msg: string) {
    this._msgParent.next(msg);
  }
  setMessageFromServiceToChild(msg: string) {
    this._msgChild.next(msg);
  }

  // Observable functions
  messageObservableForChild() {
    return this._msgChild.next('Child using subject');
  }

  messageObservableForParent() {
    return this._msgParent.next('Parent using subject');
  }

  // Service var
  private _msgChild = new Subject<string>();
  private _msgParent = new Subject<string>();

  messageChild$ = this._msgChild.asObservable();
  messageParent$ = this._msgParent.asObservable();
  constructor() {}
}
