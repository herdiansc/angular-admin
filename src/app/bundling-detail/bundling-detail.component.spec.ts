import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlingDetailComponent } from './bundling-detail.component';

describe('BundlingDetailComponent', () => {
  let component: BundlingDetailComponent;
  let fixture: ComponentFixture<BundlingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
