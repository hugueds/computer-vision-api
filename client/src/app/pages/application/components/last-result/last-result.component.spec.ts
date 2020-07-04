import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastResultComponent } from './last-result.component';

describe('LastResultComponent', () => {
  let component: LastResultComponent;
  let fixture: ComponentFixture<LastResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
