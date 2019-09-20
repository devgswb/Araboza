import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Result_totalPnchart extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.props.data.map((e, index)=>{
            this.data.push({
               "site_name": this.props.siteName[e.site_code],
               "negative": -e.negative_percentage,
               "positive": e.positive_percentage
           });
        });
    }

    componentDidMount() {
        var chart = am4core.create("total-pnchart", am4charts.XYChart);
        chart.paddingRight =30;
        var title = chart.titles.push(new am4core.Label());
        title.text = "사이트 별 반응";
        title.fontSize = 25;
        title.marginBottom = 15;
        title.fontFamily= "Jua";

        chart.data = this.data;


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

        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";
        // chart.legend.width = 100;

// Use only absolute numbers
        // 절대값 형식
        chart.numberFormatter.numberFormat = "#.#s";

        function createSeries(field, name, color) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "site_name";
            series.stacked = true;
            series.name = name;
            series.stroke = color;
            series.fill = color;

            if (field === 'positive') {
                series.legendSettings.labelText = "[bold {color}]긍정적";
            } else if (field === 'negative') {
                series.legendSettings.labelText = "[bold {color}]부정적";
            }

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

            var labelBullet1 = series.bullets.push(new am4charts.LabelBullet);
            labelBullet1.label.text = "{valueX}%";
            labelBullet1.label.fontFamily ="Jua";
            labelBullet1.label.fill = am4core.color("#000");
            labelBullet1.label.strokeWidth = 0;
            labelBullet1.label.truncate = false;
            labelBullet1.alwaysShowTooltip = true;
            labelBullet1.label.hideOversized = false;
            labelBullet1.locationX = -0.1;
            labelBullet1.label.fontSize= 15;

            chart.responsive.rules.push({
                relevant:(target)=>{
                    if(target.pixelWidth <= 400){
                        return true;
                    }
                },
                state: (target, stateId)=> {
                    if(target instanceof am4charts.Legend){
                         let state = target.states.create(stateId);
                         state.properties.scale = 0.7 ;
                         return state;
                    }
                    if(target instanceof am4charts.LabelBullet){
                         let state = target.states.create(stateId);
                         state.properties.fontSize=10;
                         state.properties.locationX = -0.1;
                         return state;
                    }
                    if(target instanceof am4core.Label){
                         let state = target.states.create(stateId);
                         state.properties.fontSize=10;

                         return state;
                    }
                    if(target instanceof am4charts.CategoryAxis){
                         let state = target.states.create(stateId);
                         state.properties.location = 2;
                         state.properties.fontSize=10;
                         state.properties.fontFamily = "Jua";
                         return state;
                    }
                }
            });

            return series;
        }

        // var interfaceColors = new am4core.InterfaceColorSet();
        // var positiveColor = interfaceColors.getFor("positive");
        // var negativeColor = interfaceColors.getFor("negative");
        var positiveColor = am4core.color('#1f7aff');
        var negativeColor = am4core.color('#ff0e0b');

        createSeries("negative", "negative", negativeColor.lighten(0.5));
        createSeries("positive", "positive", positiveColor.lighten(0.5));
        this.chart = chart;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.data = [];
            this.props.data.map((e, index)=>{
                this.data.push({
                   "site_name": this.props.siteName[e.site_code],
                   "negative": -e.negative_percentage,
                   "positive": e.positive_percentage
               });
            });
            this.chart.data = this.data;
        }
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