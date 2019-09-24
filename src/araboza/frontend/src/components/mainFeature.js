import React, {Component} from 'react';
import MainArticle from "./main_article";
import '../css/mainFeature.css';
import MainRankingWordCloud from "./main_rankingWordCloud";
import MainSection from "./main_section";
import { Element} from 'react-scroll'

class MainFeature extends Component {
    render() {
        return (
            <div className='mainFeature'>
                <div className='featureRanking'>
                    <Element name="ranking"className='featureRainkingWordCloud'><MainRankingWordCloud/></Element>
                    <div className='featureSection'><MainSection/></div>
                </div>
                <div className='featureArticle'><MainArticle/></div>
            </div>
        );
    }
}

export default MainFeature;