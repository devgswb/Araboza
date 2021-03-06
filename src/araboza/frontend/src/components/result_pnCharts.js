import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Result_pnCharts extends Component {
    constructor(props) {
        super(props);

    };
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.data.positive !== nextProps.positive) return true;
    }

    componentDidMount() {
        let chart = am4core.create("pn-chart", am4charts.XYChart);
// Add data

        this.data = {
            "search_word": this.props.data.search_word,
            'positive': this.props.data.positive_percentage,
            'negative': this.props.data.negative_percentage
        };

        chart.data =[];
        chart.data.push(this.data);
        chart.align = "center";
        chart.legend = new am4charts.Legend();
        // 레전드의 위치
        chart.legend.position = "top";


        //반응형?
        //      chart.responsive.enabled = true;
        //차트 색상
        chart.colors.list = [
            am4core.color('rgba(31,122, 255, 0.8)'),
            am4core.color("rgba(255,14, 11, 0.8)")
        ];


// Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "search_word";
        categoryAxis.renderer.grid.template.opacity = 0;
        categoryAxis.renderer.labels.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        // x축의 투명도
        valueAxis.opacity = 0;
        // x축 숫자 최소 최대
        valueAxis.min = 0;
        valueAxis.max = 100;
        // 숫자의 y축 선 투명도
        valueAxis.renderer.grid.template.opacity = 0;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
        valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
        valueAxis.renderer.ticks.template.length = 10;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        //바 시작지점의 y축 선 유무
        valueAxis.renderer.baseGrid.disabled = true;
        //x축 레이블의 간격
        valueAxis.renderer.minGridDistance = 50;
        //툴팁 사용 여부
        valueAxis.cursorTooltipEnabled = true;

// Create series
        const createSeries = (field, name) => {
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "search_word";
            series.stacked = true;
            series.name = name;

            if (field === 'positive') {
                series.legendSettings.labelText = "[bold {color}]긍정적";
            } else if (field === 'negative') {
                series.legendSettings.labelText = "[bold {color}]부정적";
            } else {
                series.legendSettings.labelText = "[bold {color}]{name}[{valueX}]";
            }
            // series.legendSettings.labelText = "[bold {color}]{name}[{valueX}]";
            // 그라데이션
            // let fillModifier = new am4core.LinearGradientModifier();
            // fillModifier.gradient.rotation = 30; //그라데이션 회전
            // fillModifier.brightnesses = [5, 3, 1, 0, 0]; //색상 밝기
            // //   fillModifier.opacities = [1,0]; //투명도
            // //   fillModifier.offsets = [0,1]; //속성 길이
            // chart.fillModifier = fillModifier;
            // series.columns.template.fillModifier = fillModifier;

            // 패턴
            // let pattern = new am4core.LinePattern();
            // pattern.width = 10;
            // pattern.height = 10;
            // pattern.stroke = am4core.color('blue').lighten(0.5);
            // pattern.strokeWidth = 2;
            // pattern.rotation = 45;
            // series.columns.template.fill = pattern;


            // tooltip
            // 자동 관련 색상 채우기
            series.tooltip.getFillFromObject = false;
            if (field === 'positive') {
                series.columns.template.tooltipText = "긍정";
            } else if (field === 'negative') {
                series.columns.template.tooltipText = "부정";
            } else {
                series.columns.template.tooltipText = "{valueX}";
            }

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

            //애니메이션
            // 레전드 클릭 시 바 줄어드는 시간
            series.hiddenState.transitionDuration = 2000;
            // 바 차트 생성시 바 늘어나는 시간
            series.defaultState.transitionDuration = 2000;


            let labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.locationX = 0.5;
            labelBullet.locationY = 0.55;
            // 바에 나타나는 숫자
            labelBullet.label.text = "{valueX}%";
            // 숫자 크기
            labelBullet.label.scale = 1.5;
            // 숫자 색상
            labelBullet.label.fill = am4core.color("#fff");


        };

        createSeries("positive", "positive");
        createSeries("negative", "negative");

        this.chart = chart;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.chart.data = [{
                'search_word':this.props.data.search_word,
                'positive':this.props.data.positive_percentage,
                'negative':this.props.data.negative_percentage
             }];
        }
    }

    // componentWillUnmount() {
    //     if (this.chart) this.chart.dispose();
    // }


    render() {
        return (

            <div id="pn-chart">
            </div>

        );
    }
}

//tab 누르면 바뀜
export default Result_pnCharts;