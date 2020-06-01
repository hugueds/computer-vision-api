import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeCameraComponent } from './barcode-camera.component';

describe('BarcodeCameraComponent', () => {
  let component: BarcodeCameraComponent;
  let fixture: ComponentFixture<BarcodeCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
