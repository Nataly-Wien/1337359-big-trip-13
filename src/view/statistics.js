import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BAR_HEIGHT, MILLISECOND_PER_DAY} from '../const';
import AbstractView from './abstract';

const createStatisticsTemplate = () => `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>
          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>
          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;

const getChartData = (labels, chartData) => ({
  labels: labels.map((item) => item.toUpperCase()),
  datasets: [{
    data: chartData,
    backgroundColor: `#ffffff`,
    hoverBackgroundColor: `#ffffff`,
    anchor: `start`
  }]
});

const getChartOptions = (format, title) => ({
  plugins: {
    datalabels: {
      font: {
        size: 13
      },
      color: `#000000`,
      anchor: `end`,
      align: `start`,
      formatter: format
    }
  },
  title: {
    display: true,
    text: title,
    fontColor: `#000000`,
    fontSize: 23,
    position: `left`
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: `#000000`,
        padding: 5,
        fontSize: 13,
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      barThickness: 44,
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      minBarLength: 50
    }],
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false,
  },
});

export default class Statistics extends AbstractView {
  constructor(events) {
    super();

    this._data = events;
    this._eventTypes = Array.from(new Set(this._data.map((item) => item.type)));
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    const dataPrice = this._eventTypes.map((item) => this._data.filter((it) => it.type === item).reduce((total, value) => total + value.price, 0));

    const dataTime = this._eventTypes.map((item) => Math.floor((this._data.filter((it) => it.type === item).reduce((total, value) =>
      total + (value.endDateTime - value.startDateTime), 0)) / MILLISECOND_PER_DAY));

    const dataAmount = this._eventTypes.map((item) => this._data.filter((it) => it.type === item).length);

    this._moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: getChartData(this._eventTypes, dataPrice),
      options: getChartOptions((val) => `€ ${val}`, `MONEY`),
    });

    this._timeChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: getChartData(this._eventTypes, dataTime),
      options: getChartOptions((val) => `${val} day${val !== 1 ? `s` : ``}`, `TIME`),
    });

    this._typeChart = new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: getChartData(this._eventTypes, dataAmount),
      options: getChartOptions((val) => `${val}x`, `TYPE`),
    });
  }
}
