import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    FormsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
