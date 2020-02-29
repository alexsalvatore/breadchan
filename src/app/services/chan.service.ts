import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChanService {

  onCurrentChanChanged: EventEmitter <string> = new EventEmitter <string>()
  onChanListChanged: EventEmitter <string> = new EventEmitter <string>()

  constructor() { }

  currentChanChanged(chan_: string){
    this.onCurrentChanChanged.emit(chan_);
  }

  chanListChanged(newChan_: string){
    this.onChanListChanged.emit(newChan_);
  }

}
