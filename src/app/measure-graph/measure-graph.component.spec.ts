import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureGraphComponent } from './measure-graph.component';

describe('MeasureGraphComponent', () => {
  let component: MeasureGraphComponent;
  let fixture: ComponentFixture<MeasureGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
