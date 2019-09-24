import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ResultLineChart extends Component {
    constructor(props) {
        super(props);


        this.count = [];

        this.props.data.map((e,i) =>{
            this.count.push({date:e[0], value:e[1]})
        });
        this.word = this.props.search_word;
    }

    componentDidMount() {

        const word2 = '화제도 변화입니다';

        let label;
        let chart = am4core.create("aLineChart", am4charts.XYChart);
        chart.paddingRight = 30;

        chart.data = this.count;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.dateFormats.setKey("day", "yy-MM-dd");
        dateAxis.fontFamily = "SCDream4";


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 50;
        valueAxis.renderer.minGridDistance = 50;
        valueAxis.fontFamily = "SCDream4";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.fillOpacity = 0.5;
        series.tensionX = 0.7;
        series.alwaysShowTooltip = true;
        series.strokeWidth = 3;
        series.fontFamily = "SCDream4";


        series.events.on("ready", function () {
            label = series.createChild(am4core.Label);
            label.strokeOpacity = 0;
            label.fontSize = 20;
            label.fill = series.stroke;
            label.fillOpacity = 1;
            label.padding(0, 0, 5, 0);

            label.path = series.segments.getIndex(0).strokeSprite.path;

            series.segments.getIndex(0).strokeSprite.events.on("propertychanged", function (event) {
                if (event.property === "path") {
                    label.path = series.segments.getIndex(0).strokeSprite.path;
                }
            });
//            animateForward();

        }, 1000);


//        function animateForward() {
//            label.text = this.word;
//            let animation = label.animate({property: "locationOnPath", from: 0, to: 1}, 20000);
//            animation.events.on("animationended", animateBackwards);
//        }
//
//        function animateBackwards() {
//            label.text = word2;
//            let animation = label.animate({property: "locationOnPath", from: 1, to: 0}, 20000);
//            animation.events.on("animationended", animateForward);
//        }

        this.chart = chart;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.count = [];

            this.props.data.map((e,i) =>{
                this.count.push({date:e[0], value:e[1]})
            });
            this.chart.data = this.count;
            this.word = this.props.search_word;
        }
    }
    render() {
        return (
            <div id="aLineChart">
            </div>
        );
    }
}

export default ResultLineChart;