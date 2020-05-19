import { Component, OnInit, ViewChild } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {CommonService} from '../../service/common.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stu-admin',
  templateUrl: './stu-admin.component.html',
  styleUrls: ['./stu-admin.component.scss']
})
export class StuAdminComponent implements OnInit {

  listOfData: any[] = [];
  fixHeader = true;
  constructor(private commonService: CommonService, private message: NzMessageService) { }

  // 导出Excel的方法
  exportAsExcelFile() {
    const json = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listOfData.length ; i++) {
      json.push({
        "账户": this.listOfData[i].stu_account,
        "姓名": this.listOfData[i].stu_name,
        "性别": this.listOfData[i].stu_sex,
        "年龄": this.listOfData[i].stu_age,
        "电话": this.listOfData[i].stu_phone,
        "密码": this.listOfData[i].stu_password,
        "微信昵称": this.listOfData[i].stu_weiXinName,
        "微信头像": this.listOfData[i].stu_avatar,
        "微信账号": this.listOfData[i].stu_weiXinNum,
        "课程数": this.listOfData[i].stu_courseNum,
        "兴趣": this.listOfData[i].stu_interest,
        "所在城市": this.listOfData[i].stu_position,
        "打卡天数": this.listOfData[i].stu_cardDay,
        "经度": this.listOfData[i].longitude,
        "纬度": this.listOfData[i].latitude
      });
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    // 这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, '学员信息');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + new Date().toLocaleDateString() + '.csv');
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }
  ngOnInit() {
    this.commonService.stuAdmin()
      .subscribe(
        (res) => {
          console.log(res);
          this.listOfData = res;
        }
      );
  }

}
