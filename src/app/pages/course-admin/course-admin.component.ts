import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss']
})
export class CourseAdminComponent implements OnInit {

  listOfData: any[] = [];
  fixHeader = true;
  isVisible = false;
  paramValue: { [key: string]: any } = {};
  constructor(private commonService: CommonService, private message: NzMessageService) {}

  addcourse() {
    this.isVisible = true;
  }
  // 导出Excel的方法
  exportAsExcelFile() {
    const json = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listOfData.length ; i++) {
      json.push({
        "课程编号": this.listOfData[i].course_id,
        "课程名称": this.listOfData[i].course_name,
        "学习人数": this.listOfData[i].course_studyNum,
        "课程音频": this.listOfData[i].course_vf,
        "课程通知": this.listOfData[i].course_notice,
      });
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    // 这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, '课程信息');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + new Date().toLocaleDateString() + '.csv');
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = false;
  }
  refresh() {
    this.commonService.courseAdmin()
      .subscribe(
        (res) => {
          this.listOfData = res;
        }
      );
  }
  getAddMsg(msg) {
    if (msg === 1) {
      this.isVisible = false;
      this.refresh();
    }
  }
  deleteCourse(paramValue) {
    this.paramValue.course_id = paramValue;
    console.log(this.paramValue);
    this.commonService.courseDelete(this.paramValue)
      .subscribe(
        (res) => {
          console.log(res);
          if ( res.status === '1') {
          console.log(res.status);
          this.message.create('success', '删除成功！');
          this.refresh();
        }
        }
      );
  }

  ngOnInit() {
    this.commonService.courseAdmin()
      .subscribe(
        (res) => {
          console.log(res);
          this.listOfData = res;
        }
      );
  }

}
