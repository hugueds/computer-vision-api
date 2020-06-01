import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCameraComponent } from './video-camera.component';

describe('VideoCameraComponent', () => {
  let component: VideoCameraComponent;
  let fixture: ComponentFixture<VideoCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
