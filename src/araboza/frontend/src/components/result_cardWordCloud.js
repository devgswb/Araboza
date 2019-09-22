import React, {Component} from 'react';
import ResultWordCloud from "./result_wordCloud";
import '../css/result_cardWordCloud.css';
import {findSiteCode} from "../modules/result_function";


class ResultCardWordCloud extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);
        console.log(data.related_words);
        return (
            <div id="wordCloud-wrap">
                <ResultWordCloud data={data.related_words}/>
            </div>
        );
    }
}

export default ResultCardWordCloud;