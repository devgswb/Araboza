import React, {Component} from 'react';
import RelationChart from "./result_relationCharts";
import '../css/result_cardRelationchart.css';
import '../modules/result_function';
import {findSiteCode} from "../modules/result_function";
import ResultWordCloud from "./result_wordCloud";

class Result_cardRelationchart extends Component {
    constructor(props) {
        super(props);
        this.dataValidation = this.dataValidation.bind(this);
    }
    dataValidation(){
        let data = findSiteCode(this.props.siteCode, this.props.data);
        let related_word = data.related_words.slice(0,5);

        return(
            related_word.length !== 0 ? <RelationChart search_word={data.search_word} related_word={related_word}/> :
                <div id="none-data">데이터가 너무 적어요!</div>
        )
    }
    render() {


        return (
            <div className="site-chart-wrap">
                <div className="site-intro">{this.props.siteName[this.props.siteCode]}의 연관검색어</div>
                    {/*<RelationChart search_word={data.search_word} related_word={related_word}/>*/}
                {this.dataValidation()}
            </div>
        );
    }
}

export default Result_cardRelationchart;