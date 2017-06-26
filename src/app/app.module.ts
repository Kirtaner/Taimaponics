// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Dependencies
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModule, ConfigLoader } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';

// Skeleton
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

// App modules and simple components
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Visualization Components
// import { LineChartComponent } from './charts/line-chart/line-chart.component';

// Services
import { AuthService } from './auth.service';

// System config loader
export function configFactory(http: Http): ConfigLoader {
  return new ConfigHttpLoader(http, './config.json');
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    // LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
      deps: [Http]
    }),
    AppRoutingModule,
    DashboardModule,
    SettingsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
