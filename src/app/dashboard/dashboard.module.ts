import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

// const dashboardRoutes: Routes = [
//   { path: '',  component: DashboardComponent }
// ];

// export const dashboardRouting = RouterModule.forChild(dashboardRoutes);

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
