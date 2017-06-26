import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SerialService {
  // TODO: Tie this into project configuration
  private url;
  private socket;

  constructor(@Inject(DOCUMENT) private document) {
    const hostname = document.location.hostname;
    this.url = 'ws://' + hostname + ':3000';
  }

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
