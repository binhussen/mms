import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeComponent } from './distribute.component';

describe('DistributeComponent', () => {
  let component: DistributeComponent;
  let fixture: ComponentFixture<DistributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
