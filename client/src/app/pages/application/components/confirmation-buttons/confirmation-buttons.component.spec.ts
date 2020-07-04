import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationButtonsComponent } from './confirmation-buttons.component';

describe('ConfirmationButtonsComponent', () => {
  let component: ConfirmationButtonsComponent;
  let fixture: ComponentFixture<ConfirmationButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
