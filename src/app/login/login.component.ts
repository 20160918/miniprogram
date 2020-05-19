import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Loginstatus} from '../pojo/loginstatus';
import {CommonService} from '../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginMsg = new EventEmitter<Loginstatus>();
  paramUser: { [key: string]: any } = {};

  constructor(private commonService: CommonService, private message: NzMessageService) {
  }

  ngOnInit(): void {
  }

  // 提交用户名密码
  onSubmit(paramUser) {
    console.log(paramUser);
    this.paramUser = paramUser;
    this.commonService.userLogin(this.paramUser)
      .subscribe(loginstatus => {
        console.log(loginstatus);
        if ( loginstatus.status === '0') {
          console.log(loginstatus.status);
          this.message.create('error', '输入的用户名或密码错误');
        }
        this.sendLoginMsg(loginstatus);
      });
    // this.sendLoginMsg();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  // 发送消息至父表单
  sendLoginMsg(loginMsg: Loginstatus) {
    // let loginMsg = {
    //   "status": '1',
    //   "administrator_account": "sa",
    //   "role": '0'
    // };
    this.loginMsg.emit(loginMsg);
    console.log(this.loginMsg);
  }

}
