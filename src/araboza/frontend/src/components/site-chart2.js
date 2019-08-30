import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

am4core.useTheme(am4themes_animated);


class SiteChart2 extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let chart = am4core.create("bubble-chart", am4plugins_forceDirected.ForceDirectedTree);
        chart.legend = new am4charts.Legend();
        chart.legend.labels.template.fill = am4core.color('#ffffff');

        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        networkSeries.colors.list=[
            am4core.color("#1f7aff"),
            am4core.color("#ff0e0b"),
            am4core.color("#ff9900"),
            am4core.color("#fffa00"),
            am4core.color("#00ff02"),
            am4core.color("#a000ff")
        ];

        networkSeries.data = [{
            name: 'Hygall',
            value:15,
            children: [{
                name: 'SKT', value: 13
            }, {
                name: '페이커 연봉', value:11
            },{
                name: '이상혁', value:9
            },{
                name: '페이커 니코', value:7
            },{
                name: '데프트', value:5
            }]
        }];

        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";

        networkSeries.nodes.template.tooltipText = "{name}";
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = "{name}";
        networkSeries.fontSize = 20;
        networkSeries.maxLevels = 2;
        networkSeries.maxRadius = am4core.percent(15);
        networkSeries.manyBodyStrength = -16;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;

    }

    render() {
        return (
            <div id="bubble-chart" style={{width: "100%", height: "230px"}}>
            </div>
        );
    }
}

export default SiteChart2;