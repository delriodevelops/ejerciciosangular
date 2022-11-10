import { Component, OnInit } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartOptions,
} from 'chart.js';
import { GraficasService } from './graficas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'grafica';
  constructor(private graficasService: GraficasService) {}
  ngOnInit() {
    this.graficasService.getByStateFiltered().subscribe((res) => {
      res.forEach(({ state, positiveTestsViral }: any) => {
        this.barChartData.datasets[0].data.push(positiveTestsViral);
        this.barChartLabels.push(state);
      });
      console.log(this.barChartData);
    });
    this.graficasService.getUsaTotalFiltered().subscribe((res) => {
      res.reverse();
      res.forEach(({ date, positive }: any) => {
        this.lineChartData.datasets[0].data.push(positive);
        this.lineChartData.labels?.push(this.datify(date));
      });
    });
  }
  barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: '#e00',
        label: 'Positivos',
      },
    ],
  };
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: '#e00', label: 'Positivos' }],
  };
  datify(date: number) {
    const str = JSON.stringify(date);
    return str.slice(6, 8) + '/' + str.slice(4, 6) + '/' + str.slice(0, 4);
  }
  chartOptions: ChartOptions = {
    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      line: {
        tension: 0.1,
      },
    },
    // ⤵️ Remove the grids

    scales: {
      xAxis: {
        display: true,
        grid: {
          drawBorder: true, // removes random border at bottom
        },
      },
      yAxis: {
        min: 0,
        display: true,
      },
    },

    // ⤵️ Remove the main legend
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: '#ff0',
        displayColors: false, // removes unnecessary legend
        padding: 1,

        // ⤵️ title
        titleColor: '#000',
        titleFont: {
          size: 18,
        },

        // ⤵️ body
        bodyColor: '#111',
        bodyFont: {
          size: 13,
        },
      },
    },
  };
}
