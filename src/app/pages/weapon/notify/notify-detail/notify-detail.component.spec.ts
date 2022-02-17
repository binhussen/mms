import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyDetailComponent } from './notify-detail.component';

describe('NotifyDetailComponent', () => {
  let component: NotifyDetailComponent;
  let fixture: ComponentFixture<NotifyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
