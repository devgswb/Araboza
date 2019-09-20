import React, {Component} from 'react';
import ResultLineChart from "./result_lineChart";
import {findSiteCode} from "../modules/result_function";

class ResultCardLineChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);

        return (
            <div id="lineChart">
                <ResultLineChart data={data}/>
            </div>
        );
    }
}

export default ResultCardLineChart;