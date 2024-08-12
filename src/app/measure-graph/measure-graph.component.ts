import { Component, effect, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MeasureService } from '../measure.service';
import { MeasurePoint } from '../model/measure.int';
import { take } from 'rxjs';

export type ChartOptions = {
  series: MesureSerie[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: any;
};
type ApexAxisChartSerie = ApexAxisChartSeries[number];

export interface MesureSerie extends ApexAxisChartSerie {
  type: 'boxPlot';
  data: {
    x: string; //date
    y: [min: number, q1: number, median: number, q3: number, max: number];
    fill?: ApexFill;
    fillColor?: string;
    strokeColor?: string;
    meta?: any;
    goals?: any;
    barHeightOffset?: number;
    columnWidthOffset?: number;
  }[];
}

@Component({
  selector: 'app-measure-graph',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './measure-graph.component.html',
  styleUrl: './measure-graph.component.css',
})
export class MeasureGraphComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private measureService: MeasureService) {
    effect(() => {
      this.chartOptions.series = this.generateDateWiseTimeSeries(
        this.measureService.AllMeasure()
      );
    });
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'candlestick',
      },
      title: {
        text: 'Basic BoxPlot Chart',
        align: 'left',
      },
      xaxis: {
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
          },
        },
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: '#5C4742',
            lower: '#A5978B',
          },
        },
      },
    };
  }

  public generateDateWiseTimeSeries(values: MeasurePoint[]): MesureSerie[] {
    var i = 0;

    var series: MesureSerie[] = [
      {
        name: 'sys',
        type: 'boxPlot',
        color: '#ff3d32',
        data: values.map((value: MeasurePoint): MesureSerie['data'][number] => {
          const mean = Math.ceil(
            (value.take1.sys + value.take2.sys + value.take3.sys) / 3
          );
          return {
            strokeColor: '#ff3d32',
            x: value.date.toISOString(),
            y: [
              Math.min(value.take1.sys, value.take2.sys, value.take3.sys),
              mean,
              mean,
              mean,
              Math.max(value.take1.sys, value.take2.sys, value.take3.sys),
            ],
          };
        }),
      },
      {
        name: 'dia',
        type: 'boxPlot',
        color: '#3b82f6',
        data: values.map((value: MeasurePoint): MesureSerie['data'][number] => {
          const mean = Math.ceil(
            (value.take1.dia + value.take2.dia + value.take3.dia) / 3
          );
          return {
            strokeColor: '#3b82f6',
            x: value.date.toISOString(),
            y: [
              Math.min(value.take1.dia, value.take2.dia, value.take3.dia),
              mean,
              mean,
              mean,
              Math.max(value.take1.dia, value.take2.dia, value.take3.dia),
            ],
          };
        }),
      },
    ];

    return series;
  }
}
