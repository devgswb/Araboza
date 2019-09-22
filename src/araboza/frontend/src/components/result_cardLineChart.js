import React, {Component} from 'react';
import ResultLineChart from "./result_lineChart";
import {findSiteCode} from "../modules/result_function";
import '../css/result_cardLineChcart.css';

class ResultCardLineChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);
        let datas = data.word_freq_by_date;

        return (
            <div id="lineChart">
                <div id="lineIntro">한달간 <p>{data.search_word}</p>에 대해 이만큼 이야기 했어요</div>
                <ResultLineChart data={datas} search_word={data.search_word}/>
            </div>
        );
    }
}

export default ResultCardLineChart;