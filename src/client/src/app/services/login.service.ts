import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Login } from '../Login';

@Injectable()
export class LoginService {
  domain: String = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http
      .get<Login[]>(`${this.domain}/usuarios`)
      .map(res => res);
  }

  /*setUser(){
    tambien puede ser addUser()
  }*/
}
