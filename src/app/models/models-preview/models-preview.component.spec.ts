import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsPreviewComponent } from './models-preview.component';

describe('ModelsPreviewComponent', () => {
  let component: ModelsPreviewComponent;
  let fixture: ComponentFixture<ModelsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
