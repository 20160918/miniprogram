import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  // 登录接口
  userLogin(user): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/adminLogin';
    return this.http.post<any>(notesUrl, user, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  // 学员管理接口
  stuAdmin(): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/stuAdmin';
    return this.http.get<any>(notesUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  // 课程管理接口   // 学员-课程接口
  courseAdmin(): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/courseAdmin';
    return this.http.get<any>(notesUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  // 上传课程接口
  courseAdd(course): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/addCourse';
    return this.http.post<any>(notesUrl, course, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  // 删除课程接口
  courseDelete(course): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/deleteCourse';
    return this.http.post<any>(notesUrl, course, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  // 打卡管理接口
  cardAdmin(): Observable<any> {
    const notesUrl = 'http://127.0.0.1:5000' + '/cardAdmin';
    return this.http.get<any>(notesUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

}
