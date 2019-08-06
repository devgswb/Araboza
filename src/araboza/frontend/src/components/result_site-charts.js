import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SiteChart extends Component {
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
            am4core.color('#1DDB16'),
            am4core.color('#FAED7D'),
            am4core.color('#00D8FF'),
            am4core.color('#FF007F'),
            am4core.color('#FF5E00'),
            am4core.color('#5F00FF'),
            am4core.color('#FF0000'),
            am4core.color('#FF0000')
        ];
// Add label
        chart.innerRadius = 70;
        let label = chart.seriesContainer.createChild(am4core.Label);
        label.text = "Faker";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontSize = 50;
        label.fill = am4core.color("#ffffff");

// Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "size";
        pieSeries.dataFields.category = "sector";
        pieSeries.labels.template.fill = am4core.color("#ffffff");;
        pieSeries.colors = colorSet;
        // Animate chart data
//         let currentYear = "Faker";
//         function getCurrentData() {
//             label.text = currentYear;
//             let data = chartData[currentYear];
//             // currentYear++;
//             // if (currentYear > 2014)
//             //     currentYear = 1995;
//             return data;
//         }
// 차트 데이터 애니메이션 이었던 것
//         function loop() {
//             //chart.allLabels[0].text = currentYear;
//             let data = getCurrentData();
//             for(var i = 0; i < data.length; i++) {
//                 chart.data[i].size = data[i].size;
//             }
//             chart.invalidateRawData();
//             chart.setTimeout( loop, 4000 );
//         }
//
//         loop();

    }


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