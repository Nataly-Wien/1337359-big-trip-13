import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {MILLISECOND_PER_DAY} from '../const';
import AbstractView from './abstract';

const BAR_HEIGHT = 55;
const FONT_SIZE = 13;
const TITLE_FONT_SIZE = 23;
const THICKNESS = 44;
const LENGTH = 50;
const PADDING = 5;

const Color = {
  BACKGROUND: `#ffffff`,
  CHART: `#000000`,
};

const Setting = {
  START: `start`,
  END: `end`,
  LEFT: `left`,
};

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
    backgroundColor: Color.BACKGROUND,
    hoverBackgroundColor: Color.BACKGROUND,
    anchor: Setting.START
  }]
});

const getChartOptions = (format, title) => ({
  plugins: {
    datalabels: {
      font: {
        size: FONT_SIZE
      },
      color: Color.CHART,
      anchor: Setting.END,
      align: Setting.START,
      formatter: format
    }
  },
  title: {
    display: true,
    text: title,
    fontColor: Color.CHART,
    fontSize: TITLE_FONT_SIZE,
    position: Setting.LEFT
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: Color.CHART,
        padding: PADDING,
        fontSize: FONT_SIZE,
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      barThickness: THICKNESS,
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
      minBarLength: LENGTH
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
      options: getChartOptions((value) => `€ ${value}`, `MONEY`),
    });

    this._timeChart = new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: getChartData(this._eventTypes, dataTime),
      options: getChartOptions((value) => `${value} day${value !== 1 ? `s` : ``}`, `TIME`),
    });

    this._typeChart = new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: getChartData(this._eventTypes, dataAmount),
      options: getChartOptions((value) => `${value}x`, `TYPE`),
    });
  }
}
