import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateInViewComponent } from './animate-in-view.component';

describe('AnimateInViewComponent', () => {
  let component: AnimateInViewComponent;
  let fixture: ComponentFixture<AnimateInViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateInViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateInViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
