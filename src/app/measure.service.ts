import { Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MeasurePoint } from './model/measure.int';

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
      this.AllMeasure.set(measures);
    }
  }

  addMeasure(newMeasure: MeasurePoint) {
    this.AllMeasure.update((measures) => [...measures, newMeasure]);
    this.localStorageService.setItem(
      this.storageKey,
      JSON.stringify(this.AllMeasure())
    );
  }
}
