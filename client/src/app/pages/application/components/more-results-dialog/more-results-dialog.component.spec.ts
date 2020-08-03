import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreResultsDialogComponent } from './more-results-dialog.component';

describe('MoreResultsDialogComponent', () => {
  let component: MoreResultsDialogComponent;
  let fixture: ComponentFixture<MoreResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
