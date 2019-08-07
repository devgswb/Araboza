import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Result_pnCharts extends Component {
    constructor(props) {
        super(props);
    };
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.props.data.positive !== nextProps.positive) return true;
    // }

    // loadData(){
    //     this.props.loadData();
    // }
    componentDidMount() {
        let chart = am4core.create("pn-chart", am4charts.XYChart);
// Add data
//         this.data = {
//             "id": '',
//             'positive': this.props.positive,
//             'negative': this.props.negative
//         };
        chart.data =[];
        chart.data.push(this.props.data);

        chart.legend = new am4charts.Legend();
        // 레전드의 위치
        chart.legend.position = "top";

        //반응형?
        //      chart.responsive.enabled = true;
        //차트 색상
        chart.colors.list = [
            am4core.color("#1f7aff"),
            am4core.color("#ff0e0b")
        ];


// Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "id";
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
            series.dataFields.categoryY = "id";
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
            let fillModifier = new am4core.LinearGradientModifier();
            fillModifier.gradient.rotation = 30; //그라데이션 회전
            fillModifier.brightnesses = [5, 3, 1, 0, 0]; //색상 밝기
            //   fillModifier.opacities = [1,0]; //투명도
            //   fillModifier.offsets = [0,1]; //속성 길이
            chart.fillModifier = fillModifier;
            series.columns.template.fillModifier = fillModifier;

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
            labelBullet.label.scale = 2;
            // 숫자 색상
            labelBullet.label.fill = am4core.color("#fff");
        };

        createSeries("positive", "positive");
        createSeries("negative", "negative");

        this.chart = chart;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.chart.data = [this.props.data];
        }
    }

    // componentWillUnmount() {
    //     if (this.chart) this.chart.dispose();
    // }


    render() {
        return (
            <div id="pn-chart" style={{width: "100%", height: "200px"}}>
            </div>
        );
    }
}

//tab 누르면 바뀜
export default Result_pnCharts;