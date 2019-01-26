import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAddComponent } from './benefit-add.component';

describe('BenefitAddComponent', () => {
  let component: BenefitAddComponent;
  let fixture: ComponentFixture<BenefitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
