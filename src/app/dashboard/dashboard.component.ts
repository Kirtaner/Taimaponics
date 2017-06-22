import { Component, OnInit, OnDestroy } from '@angular/core';

import { SerialService } from '../common/serial.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ SerialService ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  connection;
  sensors;

  airTemperature;
  humidity;
  waterTemperature;
  relayStatus;

  checked: boolean;

  constructor(private serialService: SerialService) { }

  ngOnInit() {
    this.connection = this.serialService.getSensors().subscribe(message => {
      this.sensors = message;
      this.airTemperature = this.sensors.roomTemperature;
      this.humidity = this.sensors.relativeHumidity;
      this.waterTemperature = this.sensors.waterTemperature;
      this.relayStatus = this.sensors.relays;
    });

    this.checked = true;
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
