import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTabsDemoComponent } from './card-tabs-demo.component';

describe('CardTabsDemoComponent', () => {
  let component: CardTabsDemoComponent;
  let fixture: ComponentFixture<CardTabsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTabsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTabsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
