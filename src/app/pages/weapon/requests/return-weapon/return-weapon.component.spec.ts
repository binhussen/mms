import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnWeaponComponent } from './return-weapon.component';

describe('ReturnWeaponComponent', () => {
  let component: ReturnWeaponComponent;
  let fixture: ComponentFixture<ReturnWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
