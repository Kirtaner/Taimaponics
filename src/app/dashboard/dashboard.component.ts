import { Component, OnInit, OnDestroy } from '@angular/core';
import { SerialService } from '../common/serial.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ SerialService ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensors;
  connection;

  constructor(private serialService: SerialService) { }

  ngOnInit() {
    this.connection = this.serialService.getSensors().subscribe(message => {
      this.sensors = message;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
