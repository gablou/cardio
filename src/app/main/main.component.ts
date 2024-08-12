import { Component } from '@angular/core';
import { NewMeasureFromComponent } from '../new-measure-from/new-measure-from.component';
import { DisplayListComponent } from '../display-list/display-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewMeasureFromComponent, DisplayListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}