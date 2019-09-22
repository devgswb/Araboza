import React, {Component} from 'react';
import RelationChart from "./result_relationCharts";
import '../css/result_cardRelationchart.css';
import '../modules/result_function';
import {findSiteCode} from "../modules/result_function";

class Result_cardRelationchart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);
        const related_word = data.related_words.slice(0,5);

        return (
            <div className="site-chart-wrap">
                <div className="site-intro">{this.props.siteName[this.props.siteCode]}의 연관검색어</div>
                    <RelationChart search_word={data.search_word} related_word={related_word}/>
            </div>
        );
    }
}

export default Result_cardRelationchart;