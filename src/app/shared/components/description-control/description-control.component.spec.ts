import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionControlComponent } from './description-control.component';

describe('DescriptionControlComponent', () => {
  let component: DescriptionControlComponent;
  let fixture: ComponentFixture<DescriptionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
