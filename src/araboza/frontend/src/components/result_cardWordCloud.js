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

        // console.log(data.related_words);
        // let emptyCheck = () =>{
        //     return(
        //       data.related_words != null ?
        //         <ResultWordCloud data={data.related_words}/>
        //         :
        //         <div>연관단어를 불러오지 못했습니다.</div>
        //
        //     );
        // };


        return (
            <div id="wordCloud-wrap">
                <ResultWordCloud data={data.related_words}/>
                {/*{emptyCheck}*/}
            </div>
        );
    }
}

export default ResultCardWordCloud;