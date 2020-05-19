import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.scss']
})
export class CardAdminComponent implements OnInit {

  listOfData: any[] = [];
  fixHeader = true;
  constructor(private commonService: CommonService, private message: NzMessageService) {}

  // 导出Excel的方法
  exportAsExcelFile() {
    const json = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listOfData.length ; i++) {
      json.push({
        "学员账户": this.listOfData[i].stu_account,
        "打卡时间": this.listOfData[i].record_time,
        "打卡内容": this.listOfData[i].record_content
      });
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    // 这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, '打卡信息');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + new Date().toLocaleDateString() + '.csv');
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }
  ngOnInit() {
    this.commonService.cardAdmin()
      .subscribe(
        (res) => {
          const dataList: any[] = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < res.length; i++) {
            // tslint:disable-next-line:indent prefer-for-of
          	for (let j = 0; j < res[i].Record.length; j++) {
              dataList.push(res[i].Record[j]);
              // tslint:disable-next-line:indent
          	}
          }
          this.listOfData = dataList;
          console.log(this.listOfData);
        }
      );
  }

}
