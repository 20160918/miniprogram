import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { StuAdminComponent } from './pages/stu-admin/stu-admin.component';
import { CourseAdminComponent } from './pages/course-admin/course-admin.component';
import { CardAdminComponent } from './pages/card-admin/card-admin.component';
import { AddcourseComponent } from './pages/course-admin/addcourse/addcourse.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { StuCourseAdminComponent } from './pages/stu-course-admin/stu-course-admin.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StuAdminComponent,
    CourseAdminComponent,
    CardAdminComponent,
    AddcourseComponent,
    StuCourseAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
