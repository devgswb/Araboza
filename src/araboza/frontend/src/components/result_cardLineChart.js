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

        return (
            <div id="lineChart">
                <div id="lineIntro">한달간 <p>{data.search_word}</p>에 대해 이만큼 이야기 했어요</div>
                <ResultLineChart data={data}/>
            </div>
        );
    }
}

export default ResultCardLineChart;