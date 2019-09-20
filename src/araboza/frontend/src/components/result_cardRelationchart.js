import React, {Component} from 'react';
import RelationChart from "./result_relationCharts";
import '../css/result-card-relationchart.css';
import '../modules/result_function';
import {findSiteCode} from "../modules/result_function";

class Result_cardRelationchart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = findSiteCode(this.props.siteCode, this.props.data);
        console.log(data);
        return (
            <div className="site-chart-wrap">
                <div className="site-intro">{this.props.siteName[this.props.siteCode]}의 연관검색어</div>

                    <RelationChart data={data} />

            </div>
        );
    }
}

export default Result_cardRelationchart;