import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BytesTransformDemoComponent } from './bytes-transform-demo.component';

describe('BytesTransformDemoComponent', () => {
  let component: BytesTransformDemoComponent;
  let fixture: ComponentFixture<BytesTransformDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BytesTransformDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BytesTransformDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
