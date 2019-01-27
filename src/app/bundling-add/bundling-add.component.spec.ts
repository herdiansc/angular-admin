import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlingAddComponent } from './bundling-add.component';

describe('BundlingAddComponent', () => {
  let component: BundlingAddComponent;
  let fixture: ComponentFixture<BundlingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
