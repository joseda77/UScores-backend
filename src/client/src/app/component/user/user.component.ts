import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../Login';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  login: Login[];

  constructor(private loginService: LoginService) {
    this.loginService.getUser().subscribe(login => {
      this.login = login;
    });
   }

  ngOnInit() {
    }
}
