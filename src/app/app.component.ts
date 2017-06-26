import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './users/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AuthService
  ]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app works!';
  articles;
  user: User;
  message: String;
  subscription: Subscription;

  constructor( private authService: AuthService) {
    this.articles = [];

    this.subscription = authService.user$.subscribe( (user) => this.user = user );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    // example of verification
    this.authService.verify().subscribe( (res) => this.message = res['message'] );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.message = 'Logged out';
  }
}
