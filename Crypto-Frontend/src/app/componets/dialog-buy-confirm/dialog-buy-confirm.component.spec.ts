import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuyConfirmComponent } from './dialog-buy-confirm.component';

describe('DialogBuyConfirmComponent', () => {
  let component: DialogBuyConfirmComponent;
  let fixture: ComponentFixture<DialogBuyConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBuyConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBuyConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
