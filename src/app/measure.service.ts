import { Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {
  formMeasure,
  isValidMeasure,
  MeasurePoint,
  NullablePartial,
} from './model/measure.int';

@Injectable({
  providedIn: 'root',
})
export class MeasureService {
  constructor(private localStorageService: LocalStorageService) {
    this.getValueFromStorage();
  }
  storageKey = 'dataPoint';
  AllMeasure: WritableSignal<MeasurePoint[]> = signal([]);

  getValueFromStorage() {
    const data = this.localStorageService.getItem(this.storageKey);
    if (data) {
      const measures = JSON.parse(data);
      this.AllMeasure.set(
        measures.map((measure: any) => ({
          ...measure,
          date: new Date(measure.date),
        }))
      );
    }
  }

  addMeasure(newMeasure: formMeasure) {
    newMeasure.comment = newMeasure.comment || '';
    if (isValidMeasure(newMeasure)) {
      this.AllMeasure.update((measures) => [...measures, newMeasure]);
      this.localStorageService.setItem(
        this.storageKey,
        JSON.stringify(this.AllMeasure())
      );
    } else {
      alert('bad mesure');
    }
  }
}
