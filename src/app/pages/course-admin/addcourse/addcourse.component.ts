import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../../pojo/course';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  @Output() addMsg = new EventEmitter<number>();
  validateForm: FormGroup;
  newCourse: Course = new Course();
  addSuccess: boolean = true; // 是否添加成功
  paramCourse: { [key: string]: any } = {};

  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              private message: NzMessageService) {
    this.validateForm = this.fb.group({
      course_id: ['', [Validators.required]],
      course_name: ['', [Validators.required]],
      course_notice: ['', [Validators.required]],
      course_vf: ['', [Validators.required]],
    });
  }

  // 提交表单按钮
  submitForm(value: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.newCourse.course_id = value.course_id;
    this.newCourse.course_name = value.course_name;
    this.newCourse.course_notice = value.course_notice;
    this.newCourse.course_vf = value.course_vf;

    console.log(this.newCourse);
    this.commonService.courseAdd(this.newCourse)
      .subscribe(res => {
        console.log(res);
        if ( res.status === '1') {
          this.addSuccess = true;
          this.sendAddMsg(1);
          console.log(res.status);
          this.message.create('success', '添加成功！');
        } else {
          this.addSuccess = false;
          this.validateForm.reset();
          this.sendAddMsg(0);
        }
      });
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  // 向父组件发送成功消息，为关闭模态框
  sendAddMsg(msg: number) {
    this.addMsg.emit(msg);
  }
  // 重置表单
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  // 提交表单
  onSubmit(paramCourse) {
    console.log(paramCourse);
    this.paramCourse = paramCourse;
    this.commonService.courseAdd(this.paramCourse)
      .subscribe(res => {
        console.log(res);
        if ( res.status === '1') {
          console.log(res.status);
          this.message.create('success', '添加成功！');
        }
      });
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  ngOnInit() {
  }

}
