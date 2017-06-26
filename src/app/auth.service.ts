import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { User } from './users/user';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private baseUrl;
  token: string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(public http: Http, @Inject(DOCUMENT) private document) {
    const hostname = document.location.hostname;
    this.baseUrl = 'http://' + hostname + ':3000/api/user';
  }

  setUser(user: User) {
    this.userSource.next(user);
  }

  registerUser(user: User): Observable<boolean> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.baseUrl}/register`, body, options).map( (res) => this.setToken(res) );
  }

  loginUser(user): Observable<Object> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.baseUrl}/login`, body, options).map( (res) => this.setToken(res) );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  verify(): Observable<Object> {
    const currUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    const headers = new Headers({ 'x-access-token': token });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.baseUrl}/check-state`, options).map( res => this.parseRes(res) );
  }

  setToken(res) {
    const body = JSON.parse(res['_body']);
    if ( body['success'] === true ) {
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({
        name: body['user']['name'],
        token: this.token
      }));
    }

    return body;
  }

  parseRes(res) {
    const body = JSON.parse(res['_body']);

    return body;
  }
}
