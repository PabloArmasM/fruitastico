import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCenterComponent } from './buy-center.component';

describe('BuyCenterComponent', () => {
  let component: BuyCenterComponent;
  let fixture: ComponentFixture<BuyCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
