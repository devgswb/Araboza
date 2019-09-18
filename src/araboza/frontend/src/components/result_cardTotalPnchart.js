import React, {Component} from 'react';
import Result_totalPnchart from "./result_totalPnchart";

class Result_cardTotalPnchart extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div id="total-pnchart">
                <Result_totalPnchart data={data} siteName={this.props.siteName}/>
            </div>
        );
    }
}

export default Result_cardTotalPnchart;