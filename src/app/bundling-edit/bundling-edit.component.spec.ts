import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlingEditComponent } from './bundling-edit.component';

describe('BundlingEditComponent', () => {
  let component: BundlingEditComponent;
  let fixture: ComponentFixture<BundlingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
