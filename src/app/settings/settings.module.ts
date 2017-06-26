import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToggleButtonModule, InputSwitchModule } from 'primeng/primeng';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    InputSwitchModule,
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
