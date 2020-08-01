import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTestComponent } from './barcode-test.component';

describe('BarcodeTestComponent', () => {
  let component: BarcodeTestComponent;
  let fixture: ComponentFixture<BarcodeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
