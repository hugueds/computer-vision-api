import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferencePreviewComponent } from './inference-preview.component';

describe('InferencePreviewComponent', () => {
  let component: InferencePreviewComponent;
  let fixture: ComponentFixture<InferencePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferencePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferencePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
