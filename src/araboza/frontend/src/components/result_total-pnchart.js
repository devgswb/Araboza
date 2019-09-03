import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Result_totalPnchart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var chart = am4core.create("total-pnchart", am4charts.XYChart);

// Title
        var title = chart.titles.push(new am4core.Label());
        title.text = "사이트 별 여론";
        title.fontSize = 25;
        title.marginBottom = 15;

// Add data
        chart.data = [{
            "site_name": "보배드림",
            "negative": -19,
            "positive": 5,
        }, {
            "site_name": "클리앙",
           "negative": -2,
            "positive": 19,
        }, {
            "site_name": "82쿡",
            "negative": -7,
            "positive": 46,
        }, {
            "site_name": "개드립",
            "negative": -2,
            "positive": 33,
        }, {
            "site_name": "eToLAND",
            "negative": -6,
            "positive": 34,
        }, {
            "site_name": "가생이",
            "negative": -3,
            "positive": 49,
        }, {
            "site_name": "웃긴대학",
            "negative": -5,
            "positive": 49,
        }, {
            "site_name": "해연갤",
            "negative": -14,
            "positive": 37,
        }, {
            "site_name": "인스티즈",
            "negative": -9,
            "positive": 38,
        }, {
            "site_name": "MLBPARK",
            "negative": -18,
            "positive": 29,
        }, {
            "site_name": "네이트판",
            "negative": -17,
            "positive": 34,
        }, {
            "site_name": "루리웹",
            "negative": -37,
            "positive": 15,
        }, {
            "site_name": "더쿠넷",
            "negative": -24,
            "positive": 65,
        }, {
            "site_name": "오늘의유머",
            "negative": -8,
            "positive": 24,
        }, {
            "site_name": "와이고수",
            "negative": -76,
            "positive": 23,
        }];


// Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "site_name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.axisFills.template.disabled = false;
        categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = -100;
        valueAxis.max = 100;
        valueAxis.renderer.minGridDistance = 50;
        valueAxis.renderer.ticks.template.length = 5;
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            return text + "%";
        });
// Legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        chart.legend.width = 100;

// Use only absolute numbers
        // 절대값 형식
        chart.numberFormatter.numberFormat = "#.#s";

// Create series
        function createSeries(field, name, color) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "site_name";
            series.stacked = true;
            series.name = name;
            series.stroke = color;
            series.fill = color;


            series.tooltip.getFillFromObject = false;

            series.columns.template.tooltipText = "{valueX}%";
            series.tooltip._background.fill = "#000000";
            series.tooltip.pointerOrientation = "down";
            //툴팁이 마우스를 따라다니게
            series.columns.template.tooltipPosition = "pointer";
            series.tooltip._background.cornerRadius = 20;
            series.tooltip._background.strokeOpacity = 0;
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            var label = series.bullets.push(new am4charts.LabelBullet);
            label.label.text = "{valueX}%";
            label.label.fill = am4core.color("#fff");
            label.label.strokeWidth = 0;
            label.label.truncate = false;
            label.label.hideOversized = true;
            label.locationX = 0.5;
            return series;
        }

        // var interfaceColors = new am4core.InterfaceColorSet();
        // var positiveColor = interfaceColors.getFor("positive");
        // var negativeColor = interfaceColors.getFor("negative");
        var positiveColor = am4core.color('#1f7aff');
        var negativeColor = am4core.color('#ff0e0b');

        createSeries("negative", "negative", negativeColor.lighten(0.0));
        createSeries("positive", "positive", positiveColor.lighten(0.0));

    }

    render() {
        return (
            <div>
                <div id="total-pnchart">
                </div>
            </div>
        );
    }
}

export default Result_totalPnchart;