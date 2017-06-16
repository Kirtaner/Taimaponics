import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './users/user';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private base_url = 'http://127.0.0.1:3000/api/user';
  token: string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  setUser(user: User) {
    this.userSource.next(user);
  }

  registerUser(user: User): Observable<boolean> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.base_url}/register`, body, options).map( (res) => this.setToken(res) );
  }

  loginUser(user): Observable<Object> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.base_url}/login`, body, options).map( (res) => this.setToken(res) );
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

    return this.http.get(`${this.base_url}/check-state`, options).map( res => this.parseRes(res) );
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
