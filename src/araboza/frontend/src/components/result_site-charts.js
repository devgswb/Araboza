import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SiteChart extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.props.data.related_words.map((e, index)=>{
            this.data.push({
                'word':e[0],
                'count':e[1]
            })
        });
    }

    componentDidMount() {
        // Data
        // this.site_name = this.props.site_name;
// Create chart instance
        let chart = am4core.create("site-charts", am4charts.PieChart);
        chart.legend = new am4charts.Legend();
        chart.legend.position = "left";
        // chart.legend.labels.template.fill = am4core.color('#ffffff');

// Add data. 원 데이터
        chart.data = this.data;
        // chart.data.push(this.data);

        let colorSet = new am4core.ColorSet();
        colorSet.list=[
            am4core.color('#E91263'),
            am4core.color('#FF9800'),
            am4core.color('#FFEB3B'),
            am4core.color('#4CAF50'),
            am4core.color('#2196F3'),
        ];
// Add label
        chart.innerRadius = 70;
        let label = chart.seriesContainer.createChild(am4core.Label);
        label.text = this.props.data.search_word;
        // label.text = this.props.site_name;
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontSize = 30;
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
                    state.properties.fontSize = 8;
                    state.properties.Radius = 50;
                    return state;
                }
                if(target instanceof am4charts.Legend){
                     let state = target.states.create(stateId);
                     state.properties.position = "bottom";
                     state.properties.disabled = true;
                     return state;
                }
                if(target instanceof am4core.Label){
                     let state = target.states.create(stateId);
                     state.properties.fontSize=25;
                     return state;
                }
            }
        });
// Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        // pieSeries.dataFields.value = "size";
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "word";
        // pieSeries.labels.template.fill = am4core.color("#ffffff");
        pieSeries.colors = colorSet;


        this.chart = chart;
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.data !== prevProps.data) {
    //         this.chart.data = [this.props.data];
    //         // this.site_name = this.props.site_name;
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