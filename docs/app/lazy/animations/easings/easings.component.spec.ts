import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasingsComponent } from './easings.component';

describe('EasingsComponent', () => {
  let component: EasingsComponent;
  let fixture: ComponentFixture<EasingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
