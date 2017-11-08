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
  empIdFlag = 0;
  signup() {
    console.log(this.userInput)
    this.connectService.postUser(this.userInput).subscribe(res => {
      if (res.success == true) {
        this.empIdFlag = 0;
        alert("User Added Successfully");
      }
      else {
        this.empIdFlag = 1;
      }
    });




  }
  flag = 0
  showCalendar() {
    this.dateFlag = 0;
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
  dateFlag = 0;

  getDate() {


    this.userAttendance.empId = localStorage.getItem("empId");
    this.connectService.postAttendance(this.userAttendance).subscribe(res => {
      if (res.success != true) {
        this.dateFlag = 1;
        //alert("Date already exists");
      } else {
        this.dateFlag = 0;
      }
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
      for (var i = 0; i < this.savedAdminAttendance.length; i++) {
        this.savedAdminAttendance[i].date = this.savedAdminAttendance[i].date.split('T')[0];
      }
    });
  }



}
