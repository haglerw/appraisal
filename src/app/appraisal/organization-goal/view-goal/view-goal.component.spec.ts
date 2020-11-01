import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGoalComponent } from './view-goal.component';

describe('ViewGoalComponent', () => {
  let component: ViewGoalComponent;
  let fixture: ComponentFixture<ViewGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
