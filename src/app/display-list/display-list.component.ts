import { Component, WritableSignal } from '@angular/core';
import { MeasureService } from '../measure.service';
import { MeasurePoint } from '../model/measure.int';

@Component({
  selector: 'app-display-list',
  standalone: true,
  imports: [],
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.css',
})
export class DisplayListComponent {
  measures: WritableSignal<MeasurePoint[]>;
  constructor(private measureService: MeasureService) {
    this.measures = this.measureService.AllMeasure; // would be nice to get a ro signal
  }
}
