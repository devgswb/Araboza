import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";

am4core.useTheme(am4themes_animated);

class ResultWordCloud extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.props.data.map(e=>{
            this.data.push({
                tag: e[0],
                count:e[1]
            })
        })
    }
    componentDidMount() {
        let chart = am4core.create("wordCloud", am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

        series.accuracy = 4;
        series.step = 15;
        series.rotationThreshold = 0.7;
        // series.maxCount = 200;
        series.minWordLength = 3;
        series.labels.template.margin(4, 4, 4, 4);
        series.maxFontSize = am4core.percent(40);
        series.minFontSize = am4core.percent(10);
        series.data = this.data;
        series.dataFields.word = "tag";
        series.dataFields.value = "count";
        series.colors = new am4core.ColorSet();
        series.colors.passOptions = {}; // makes it loop
        //series.labelsContainer.rotation = 45;
        series.angles = [0, 90];
        series.fontWeight = "700";
        series.labels.template.tooltipText = "{count}[/]";

        this.series = series;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.data = [];
            this.props.data.map(e=>{
                this.data.push({
                    tag: e[0],
                    count:e[1]
                })
            });
            this.series.data = this.data;
            if(this.series.data.length === 1) {
                this.series.angles = [0];
                // this.series.maxFontSize = am4core.percent(60);
                // this.series.minFontSize = am4core.percent(30);
            }else{
                this.series.angles = [0, -90];
                this.series.maxFontSize = am4core.percent(50);
                // this.series.minFontSize = am4core.percent(10);
                this.series.step = 15;
                this.series.accuracy = 4;
                this.series.rotationThreshold = 0.7;
                this.series.minWordLength = 3;
                this.series.labels.template.margin(4, 4, 4, 4);
            }

        }
    }
    render() {
        return (
            <div id="wordCloud">
            </div>
        );
    }
}

export default ResultWordCloud;