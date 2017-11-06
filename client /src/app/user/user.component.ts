import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private connectService: ConnectService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.setItem("loginStatus", "0");
    localStorage.setItem("empId", "null");
    this.router.navigate(['/login']);
  }
  userAttendance = {
    date: "",
    empId: ""
  }
  savedUserAttendance:any;
  tableFlag=0;
  getDate() {
    this.userAttendance.empId = localStorage.getItem("empId");
    this.connectService.postAttendance(this.userAttendance).subscribe(res => {

    });


  }
  flag=0
  showCalendar(){
    this.tableFlag=0;
    if(this.flag==0)
    {
      this.flag=1;
    }
    else{
      this.flag=0;
    }
  }
  showAttendance() {
    this.flag=0;
    if(this.tableFlag==0)
    {
      this.tableFlag=1;
    }
    else{
      this.tableFlag=0;
    }
    this.connectService.showAttendance().subscribe(res => {
      this.savedUserAttendance=res;
    });
  }



}


