import React, {Component} from 'react';
import ResultWordCloud from "./result_wordCloud";
import '../css/result_cardWordCloud.css';

class ResultCardWordCloud extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wordCloud-wrap">
                <ResultWordCloud/>
            </div>
        );
    }
}

export default ResultCardWordCloud;