import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ConnectService {

  constructor(public httpService: Http) { }
 getUsers='http://localhost:1996/api/user';
 postUsers='http://localhost:1996/api/user';
 postAttendances='http://localhost:1996/api/attendance';
  login(): Observable<any> {
    return this.httpService.get(this.getUsers).map(
      (res: Response) => res.json());
  }

  //To save users data
  postUser(Data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postUsers, Data, options).map(
      data => data.json());
  }
  //To mark attendance
  postAttendance(Details): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    console.log("test" +Details);
    return this.httpService.post(this.postAttendances, Details, options).map(
      data => data.json());

    }
    //To display the attendance
    showAttendance(): Observable<any> {
      var empId=localStorage.getItem("empId");  
      return this.httpService.get('http://localhost:1996/api/attendance'+'/'+empId).map(
        (res: Response) => res.json());
    }
}

