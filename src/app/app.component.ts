import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Loginstatus} from './pojo/loginstatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loginstatus: { [key: string]: any } = {};
  // loginstatus: Loginstatus;
  isLogged: boolean; // 是否登录
  isCollapsed = false;
  index = 0;
  tabs = [];
  tab: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    console.log(sessionStorage.getItem('status'));
    console.log(sessionStorage.getItem('administrator_account'));
    console.log(sessionStorage.getItem('role'));
    console.log(sessionStorage.getItem('tab'));
    if (sessionStorage.getItem('status')) {
      if (sessionStorage.getItem('status') === '1') {
        this.isLogged = true;
        this.loginstatus.status = sessionStorage.getItem('status');
        this.loginstatus.administrator_account = sessionStorage.getItem('administrator_account');
        this.loginstatus.role = sessionStorage.getItem('role');
        this.loginstatus.tab = sessionStorage.getItem('tab');
      }
    }
    console.log(window.location.href);
    const hre = window.location.href.split('/');
    console.log(hre[3]);
    if (!hre[3]) {
      this.tabs.push('学员管理');
      console.log(this.tabs);
      this.router.navigateByUrl('/stu-admin');
    }
    if (hre[3]) {
      this.tabs.push(this.loginstatus.tab);
      this.router.navigateByUrl(hre[3]);
      console.log(this.tabs);
    }
  }

  newTab(tab: string): void {

    if (this.tabs.indexOf(tab) === -1) {
      this.tabs.push(tab);
      console.log(this.tabs);
      this.index = this.tabs.length - 1;
      this.tab = this.tabs[this.tabs.length - 1];
      console.log(this.tab);
      sessionStorage.setItem('tab',  this.tab);

    } else {
      this.index = this.tabs.indexOf(tab);
    }

  }
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }


  getLoginMsg(msg) {
    console.log(msg);
    this.loginstatus = msg;
    this.isLogged = (msg.status === '1');
    sessionStorage.setItem('status', msg.status);
    sessionStorage.setItem('administrator_account', msg.administrator_account);
    sessionStorage.setItem('role', msg.role);
  }
  signOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/stu-admin');
    this.isLogged = false;
  }


}
