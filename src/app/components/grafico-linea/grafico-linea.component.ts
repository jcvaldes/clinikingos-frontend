import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styles: []
})
export class GraficoLineaComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('chartLabels') lineChartLabels: Label[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartData') lineChartData: any[][2] = [][2];
  // tslint:disable-next-line: no-input-rename
  @Input('options') lineChartOptions: any;
  // tslint:disable-next-line: no-input-rename
  @Input('colors') lineChartColors: any;
  
  public lineChartLegend = true;
  public lineChartPlugins = [pluginAnnotations];
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
