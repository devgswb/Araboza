import React, {Component} from 'react';
import Result_pnCharts from "./result_pn-charts";
import '../css/result-card-pnchart.css';

class ResultCardPnchart extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        const sentence = numberWithCommas(this.props.data.total_sentence_count);
        return (
             <div className="pn-chart-wrap">
                <div className="res-intro">
                    {this.props.data.search_word}에 대하여 {sentence}개의 문장에서 검색한 결과
                </div>
                    <Result_pnCharts  data={this.props.data}/>

             </div>
        );
    }
}

export default ResultCardPnchart;