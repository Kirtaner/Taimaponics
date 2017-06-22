import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Routes, RouterModule } from '@angular/router';

import { ToggleButtonModule, InputSwitchModule } from 'primeng/primeng';

import { DashboardComponent } from './dashboard.component';

// const dashboardRoutes: Routes = [
//   { path: '',  component: DashboardComponent }
// ];

// export const dashboardRouting = RouterModule.forChild(dashboardRoutes);

@NgModule({
  imports: [
    CommonModule,
    ToggleButtonModule,
    InputSwitchModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
