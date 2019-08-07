import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SiteChart extends Component {
    constructor(props) {
        super(props);
        console.log('site-chart=' + this.props.data);
    }

    componentDidMount() {
        // Data
        let chartData = {
            "Faker": [
                { "sector": "SKT", "size": 6.6 },
                { "sector": "미드 올라프", "size": 0.6 },
                { "sector": "페이커 나이", "size": 23.2 },
                { "sector": "이상혁", "size": 2.2 },
                { "sector": "롤 페이커", "size": 4.5 },
                { "sector": "에피커 연봉", "size": 14.6 },
                { "sector": "데프트", "size": 9.3 },
                { "sector": "페이커 데프트", "size": 22.5 } ]
        };

// Create chart instance
        let chart = am4core.create("site-charts", am4charts.PieChart);

// Add data. 원 데이터
        chart.data = [
            { "sector": "SKT", "size": 6.6 },
            { "sector": "미드 올라프", "size": 0.6 },
            { "sector": "페이커 나이", "size": 23.2 },
            { "sector": "이상혁", "size": 2.2 },
            { "sector": "롤 페이커", "size": 4.5 },
            { "sector": "에피커 연봉", "size": 14.6 },
            { "sector": "데프트", "size": 9.3 },
            { "sector": "페이커 데프트", "size": 22.5 }
        ];

        let colorSet = new am4core.ColorSet();
        colorSet.list=[
            am4core.color('#E91263'),
            am4core.color('#FF5722'),
            am4core.color('#FF9800'),
            am4core.color('#FFEB3B'),
            am4core.color('#4CAF50'),
            am4core.color('#9C27B0'),
            am4core.color('#2196F3'),
            am4core.color('#3F51B5')
        ];
// Add label
        chart.innerRadius = 70;
        let label = chart.seriesContainer.createChild(am4core.Label);
        label.text = "Faker";
        // label.text = this.props.site_name;
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontSize = 50;
        label.fill = am4core.color("#ffffff");

// Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "size";
        // pieSeries.dataFields.value = "word";
        pieSeries.dataFields.category = "sector";
        // pieSeries.dataFields.category = "count";
        pieSeries.labels.template.fill = am4core.color("#ffffff");;
        pieSeries.colors = colorSet;

        this.chart = chart;
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.data !== prevProps.data) {
    //         this.chart.data = [this.props.data];
    //     }
    // }

    render() {
        return (
            <div>
                <div id="site-charts" style={{ width: "100%", height: "230px"}}>
                </div>
            </div>
        );
    }
}

export default SiteChart;