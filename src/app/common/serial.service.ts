import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SerialService {
  // TODO: Tie this into project configuration
  private url = 'ws://localhost:3000';
  private socket;

  constructor() { }

  relayOn(relay) {
    this.socket.emit('relayOn', relay);
  }

  relayOff(relay) {
    this.socket.emit('relayOff', relay);
  }

  getSensors() {
    const observable = new Observable(observer => {
      // this.socket = new WebSocket(this.url);
      this.socket = io(this.url);
      this.socket.on('sensors', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
