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
        let related_words = [];

        if(data.related_words.length === 0){
            related_words.push(
                ["데이터가 너무 적어요!", 100]
            )
        }else{
            related_words = data.related_words;
        }


        return (
            <div id="wordCloud-wrap">
                <ResultWordCloud data={related_words}/>
                {/*{emptyCheck}*/}
            </div>
        );
    }
}

export default ResultCardWordCloud;