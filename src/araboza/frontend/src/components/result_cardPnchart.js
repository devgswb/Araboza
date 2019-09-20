import React, {Component} from 'react';
import Result_pnCharts from "./result_pnCharts";
import '../css/result_cardPnchart.css';
import {findSiteCode} from "../modules/result_function";

class Result_cardPnchart extends Component {
    constructor(props) {
        super(props);
        this.inputCommas = this.inputCommas.bind(this);
    }
    inputCommas(count) {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);
        const sentence = this.inputCommas(data.total_sentence_count);
        return (
             <div className="pn-chart-wrap">
                <div className="res-intro">
                    <p>{data.search_word}</p>에 대하여 {sentence}개의 문장에서 검색한 결과
                </div>
                    <Result_pnCharts data={data}/>

             </div>
        );
    }
}

export default Result_cardPnchart;