import React, {Component} from 'react';
import Result_totalPnchart from "./result_totalPnchart";
import '../css/result_cardTotalPnChart.css';

class Result_cardTotalPnchart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="totalPnChart">
                <Result_totalPnchart data={this.props.data} siteName={this.props.siteName}/>
            </div>
        );
    }
}

export default Result_cardTotalPnchart;