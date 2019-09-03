import React, {Component} from 'react';
import SiteChart from "./result_relation-charts";
import '../css/result-card-relationchart.css';

class ResultCardRelationchart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="site-chart-wrap">
                <div className="site-intro">{this.props.site_name}의 연관검색어</div>
                <div id="site-chart">
                    <SiteChart data={this.props.data} site_name={this.props.site_name} />
                </div>
            </div>
        );
    }
}

export default ResultCardRelationchart;