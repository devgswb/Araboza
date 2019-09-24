import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_frozen from "@amcharts/amcharts4/themes/frozen.js";
//
// am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);

class RelationChart extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.props.related_word.map((e, index)=>{
            this.data.push({
                'word':e[0],
                'count':e[1]
            })
        });
    }

    componentDidMount() {
// Create chart instance
        let chart = am4core.create("site-chart", am4charts.PieChart);
        // chart.responsive.enabled = false;
        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        // chart.legend.scale = 1;
        chart.legend.labels.template.fontSize = 18;
        chart.legend.labels.template.fontFamily = "Jua";
        chart.legend.useDefaultMarker = true;
        chart.align = "right";
        var marker = chart.legend.markers.template.children.getIndex(0);
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 2;

// Add data. 원 데이터
        chart.data = this.data;
        // chart.data.push(this.data);

        let colorSet = new am4core.ColorSet();
        colorSet.list=[
            am4core.color('#ef476f'),
            am4core.color('#ffd166'),
            am4core.color('#06d6a0'),
            am4core.color('#118ab2'),
            // am4core.color('#073b4c'),
            am4core.color('#f12912'),
            am4core.color('#f25a00'),
            am4core.color('#fea008'),
            am4core.color('#ffe938'),
            am4core.color('#57c328'),
        ];

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "word";
        pieSeries.colors = colorSet;
        pieSeries.labels.template.disabled = true;

// Add label
        chart.innerRadius = 70;
        let label = chart.seriesContainer.createChild(am4core.Label);
        label.text = this.props.search_word;
        // label.text = this.props.site_name;
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontFamily = "YS";
        label.fontSize = 25;
        // label.fill = am4core.color("#ffffff");


        chart.responsive.rules.push({
            relevant:(target)=>{
                if(target.pixelWidth <= 505){
                    return true;
                }
            },
            state: (target, stateId)=> {
                if(target instanceof  am4charts.Chart) {
                    let state = target.states.create(stateId);
                    state.properties.fontSize = 1;
                    state.properties.innerRadius = am4core.percent(25);
                    return state;
                }
                if(target instanceof am4charts.Legend){
                     let state = target.states.create(stateId);
                     state.properties.position = "left";
                     state.properties.scale = 0.7 ;
                     // state.properties.disabled = true;
                     return state;
                }
                if(target instanceof am4core.Label){
                     let state = target.states.create(stateId);
                     state.properties.fontSize=23;
                     return state;
                }

            }
        });
        chart.responsive.rules.push({
            relevant:(target)=>{
                if(target.pixelWidth <= 320){
                    return true;
                }
            },
            state: (target, stateId)=> {

                if(target instanceof am4charts.Legend){
                     let state = target.states.create(stateId);
                     state.properties.position = "absolute";
                     state.properties.scale = 0.4 ;
                     return state;
                }

            }
        });

        this.chart = chart;
        this.label = label;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.related_word !== prevProps.related_word) {
            this.data = [];
            this.props.related_word.map((e, index)=>{
                this.data.push({
                    'word':e[0],
                    'count':e[1]
                 })
             });
            this.chart.data = this.data;
            this.label.text = this.props.search_word;
        }
    }

    render() {
        return (
            <div>
                <div id="site-chart">
                </div>
            </div>
        );
    }
}

export default RelationChart;