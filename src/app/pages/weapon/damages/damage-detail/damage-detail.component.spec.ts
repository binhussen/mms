import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageDetailComponent } from './damage-detail.component';

describe('DamageDetailComponent', () => {
  let component: DamageDetailComponent;
  let fixture: ComponentFixture<DamageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
