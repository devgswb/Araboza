import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ResultLineChart extends Component {
    constructor(props) {
        super(props);
        this.date = this.props.data.word_freq_by_date;

        this.count = [];

        this.date.map((e,i) =>{
            this.count.push({date:e[0], value:e[1]})
        });
        console.log(this.count);
    }

    componentDidMount() {
        const word = this.props.data.search_word;
        const word2 = '화제도 추이입니다';

        let label;
        let chart = am4core.create("aLineChart", am4charts.XYChart);
        chart.paddingRight = 30;

        var title = chart.titles.push(new am4core.Label());
        title.text = "한달간" + word +"에 대해 이만큼 이야기 했어요";
        title.fontSize = 25;
        title.marginBottom = 15;
        title.fontFamily= "Jua";
        title.margin(0, 0, 50, 50);

        let data = [];
        let value = 10;
        for(let i=1;i<30;i++){
            value += Math.round(1 * Math.random() * 5);
            data.push({date : new Date(2019, 2, i), value:value})
        }

        // let data = [{
        //     date: '2019-01-01',
        //     value: 50
        // }, {
        //     date: '2019-01-05',
        //     value: 100
        // }, {
        //     date: '2019-01-10',
        //     value: 38
        // }, {
        //     date: '2019-01-15',
        //     value: 24
        // }, {
        //     date: '2019-01-20',
        //     value: 80
        // }, {
        //     date: '2019-01-25',
        //     value: 43
        // }, {
        //     date: '2019-01-30',
        //     value: 152
        // },];

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.fontFamily = "Jua";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 50;
        valueAxis.renderer.minGridDistance = 50;
        valueAxis.fontFamily = "Jua";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.fillOpacity = 0.5;
        series.tensionX = 0.7;
        series.alwaysShowTooltip = true;
        series.strokeWidth = 3;
        series.fontFamily = "Jua";

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
            animateForward();

        }, 1000);


        function animateForward() {
            label.text = word;
            let animation = label.animate({property: "locationOnPath", from: 0, to: 1}, 12000);
            animation.events.on("animationended", animateBackwards);
        }

        function animateBackwards() {
            label.text = word2;
            let animation = label.animate({property: "locationOnPath", from: 1, to: 0}, 8000);
            animation.events.on("animationended", animateForward);
        }

    }

    render() {
        return (
            <div id="aLineChart" style={{width: '100%', height: '300px'}}>

            </div>
        );
    }
}

export default ResultLineChart;