import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SerialService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  relayOn(relay){
    this.socket.emit('relayOn', relay);
  }

  relayOff(relay){
    this.socket.emit('relayOff', relay);
  }

  getSensors() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('sensors', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}