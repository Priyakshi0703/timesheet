import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private connectService: ConnectService, private router: Router) { }
  userInput = {
    empId: "",
    password: ""
  };
  ngOnInit() {
  }
  flag = 0;
  login() {
    this.connectService.login().subscribe(res => {
      for (let loginDetail of res) {
        if (loginDetail.empId == this.userInput.empId && this.userInput.password == loginDetail.password) {
          localStorage.setItem("loginStatus", loginDetail.role);
          localStorage.setItem("empId", loginDetail.empId);
          this.flag = 1;
          if (loginDetail.role == 1) {
            this.router.navigate(['/admin']);
          }
          else if (loginDetail.role == 2) {
            this.router.navigate(['/user']);
          }

        }
      }
      if (this.flag == 0) {
        this.flag=2;
      }

    })

  }
}

