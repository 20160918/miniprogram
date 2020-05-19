import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuCourseAdminComponent } from './stu-course-admin.component';

describe('StuCourseAdminComponent', () => {
  let component: StuCourseAdminComponent;
  let fixture: ComponentFixture<StuCourseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuCourseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuCourseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
