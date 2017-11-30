import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollServiceDemoComponent } from './scroll-service-demo.component';

describe('ScrollServiceDemoComponent', () => {
  let component: ScrollServiceDemoComponent;
  let fixture: ComponentFixture<ScrollServiceDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollServiceDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollServiceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
