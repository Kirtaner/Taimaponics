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

  constructor(private serialService: SerialService) { }

  ngOnInit() {
    this.connection = this.serialService.getSensors().subscribe(message => {
      this.sensors = message;
      this.airTemperature = this.sensors[0];
      this.humidity = this.sensors[1];
      this.waterTemperature = this.sensors[2];
      this.relayStatus = this.sensors[3];
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
