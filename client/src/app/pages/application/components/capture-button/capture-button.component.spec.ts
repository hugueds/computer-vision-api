import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureButtonComponent } from './capture-button.component';

describe('CaptureButtonComponent', () => {
  let component: CaptureButtonComponent;
  let fixture: ComponentFixture<CaptureButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
