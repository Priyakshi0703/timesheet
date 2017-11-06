import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  onSubmit(value: any) {
    console.log(value);
  }
  constructor(private connectService: ConnectService, private router: Router) { }

  ngOnInit() {
  }
  userInput = {
    firstname: "",
    password: "",
    lastname: "",
    empId: "",
    role: 2
  };
  logout() {
    localStorage.setItem("loginStatus", "0");
    localStorage.setItem("empId", "null");
    this.router.navigate(['/login']);
  }
  signup() {
    console.log(this.userInput)
    this.connectService.postUser(this.userInput).subscribe(res => {
      alert("User Added Successfully");
      console.log(res);
      console.log("coming");
      console.log(typeof(res));
    },
    errorr => { alert("Error"); 
    });




  }
  flag = 0
  showCalendar() {
    this.tableFlag = 0;
    if (this.flag == 0) {
      this.flag = 1;
    }
    else {
      this.flag = 0;
    }
  }
  userAttendance = {
    date: "",
    empId: ""
  }
  getDate() {


    this.userAttendance.empId = localStorage.getItem("empId");
    this.connectService.postAttendance(this.userAttendance).subscribe(res => {

    });


  }
  savedAdminAttendance: any;
  tableFlag = 0;
  showAttendance() {
    this.flag = 0;
    if (this.tableFlag == 0) {
      this.tableFlag = 1;
    }
    else {
      this.tableFlag = 0;
    }
    this.connectService.showAttendance().subscribe(res => {
      this.savedAdminAttendance = res;
    });
  }



}
