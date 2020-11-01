import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObjectiveComponent } from './create-objective.component';

describe('CreateObjectiveComponent', () => {
  let component: CreateObjectiveComponent;
  let fixture: ComponentFixture<CreateObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
