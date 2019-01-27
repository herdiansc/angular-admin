import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlingListComponent } from './bundling-list.component';

describe('BundlingListComponent', () => {
  let component: BundlingListComponent;
  let fixture: ComponentFixture<BundlingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
