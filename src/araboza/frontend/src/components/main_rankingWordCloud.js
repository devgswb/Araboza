import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import axios from "axios";
import '../css/main_rankingwordcloud.css';

am4core.useTheme(am4themes_animated);

class MainRankingWordCloud extends Component {

    constructor(props) {
        super(props);

        this.state = {
             data : {
                 oneDayData : [],
             }
        };
        axios.get(`/api/hotword/?day=0`)
            .then((res) => {
                console.log("start");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    oneDayData : res.data.result
                });
                console.log(this.state.oneDayData);
            }).catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let chart = am4core.create("rankWordCloud", am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

        axios.get(`/api/hotword/?day=0`)
            .then((res) => {
                console.log("두번째");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    oneDayData : res.data.result
                });
                series.data = this.state.oneDayData;
            }).catch(function (error) {
                console.log(error);
            });

        series.accuracy = 4;
        series.step = 15;
        series.rotationThreshold = 0.7;
        series.maxCount = 200;
        series.minWordLength = 2;
        series.labels.template.margin(4, 4, 4, 4);
        series.maxFontSize = am4core.percent(30);
        series.minFontSize = am4core.percent(10);
        series.dataFields.word = "word";
        series.dataFields.value = "count";
        series.colors = new am4core.ColorSet();
        series.colors.passOptions = {};
        series.fontFamily = "TmonMonsori";
        series.angles = [0, -90];
        series.fontWeight = "700";

        series.labels.template.tooltipText = "{count}[/]";
    }

    render() {
        return (
            <div id="rankWordCloud">
            </div>
        );
    }
}

export default MainRankingWordCloud;