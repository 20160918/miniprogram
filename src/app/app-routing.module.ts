import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StuAdminComponent} from './pages/stu-admin/stu-admin.component';
import {CourseAdminComponent} from './pages/course-admin/course-admin.component';
import {CardAdminComponent} from './pages/card-admin/card-admin.component';
import {StuCourseAdminComponent} from './pages/stu-course-admin/stu-course-admin.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  { path: '', redirectTo: '/stu-admin', pathMatch: 'full' },
  { path: 'stu-admin', component: StuAdminComponent },
  { path: 'course-admin', component: CourseAdminComponent },
  { path: 'card-admin', component: CardAdminComponent },
  { path: 'stu-course', component: StuCourseAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
