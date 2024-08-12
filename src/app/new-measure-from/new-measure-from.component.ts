import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MeasureService } from '../measure.service';
import { CalendarModule } from 'primeng/calendar';

interface takeForm {
  sys: FormControl<number | null>;
  dia: FormControl<number | null>;
  pulse: FormControl<number | null>;
}

interface NewMeasureFrom {
  comment: FormControl<string | null>;
  date: FormControl<Date | null>;
  take1: FormGroup<takeForm>;
  take2: FormGroup<takeForm>;
  take3: FormGroup<takeForm>;
}

@Component({
  selector: 'app-new-measure-from',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './new-measure-from.component.html',
  styleUrl: './new-measure-from.component.css',
})
export class NewMeasureFromComponent {
  newMeasureFrom: FormGroup<NewMeasureFrom>;

  constructor(
    private formBuilder: FormBuilder,
    private measureService: MeasureService
  ) {
    this.newMeasureFrom = this.formBuilder.group({
      take1: this.formBuilder.group<takeForm>({
        sys: this.formBuilder.control(null),
        dia: this.formBuilder.control(null),
        pulse: this.formBuilder.control(null),
      }),
      take2: this.formBuilder.group<takeForm>({
        sys: this.formBuilder.control(null),
        dia: this.formBuilder.control(null),
        pulse: this.formBuilder.control(null),
      }),
      take3: this.formBuilder.group<takeForm>({
        sys: this.formBuilder.control(null),
        dia: this.formBuilder.control(null),
        pulse: this.formBuilder.control(null),
      }),
      comment: this.formBuilder.control(''),
      date: this.formBuilder.control(new Date()),
    });
  }

  onSubmit() {
    this.measureService.addMeasure(this.newMeasureFrom.value);
    console.log(this.newMeasureFrom.value);
  }
}
