import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuAdminComponent } from './stu-admin.component';

describe('StuAdminComponent', () => {
  let component: StuAdminComponent;
  let fixture: ComponentFixture<StuAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
