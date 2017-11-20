import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElInViewDemoComponent } from './el-in-view-demo.component';

describe('ElInViewDemoComponent', () => {
  let component: ElInViewDemoComponent;
  let fixture: ComponentFixture<ElInViewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElInViewDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElInViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
