import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySimulatorComponent } from './buy-simulator.component';

describe('BuySimulatorComponent', () => {
  let component: BuySimulatorComponent;
  let fixture: ComponentFixture<BuySimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
