import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWeaponComponent } from './request-weapon.component';

describe('RequestWeaponComponent', () => {
  let component: RequestWeaponComponent;
  let fixture: ComponentFixture<RequestWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
