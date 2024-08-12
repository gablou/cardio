import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasureFromComponent } from './new-measure-from.component';

describe('NewMeasureFromComponent', () => {
  let component: NewMeasureFromComponent;
  let fixture: ComponentFixture<NewMeasureFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMeasureFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMeasureFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
