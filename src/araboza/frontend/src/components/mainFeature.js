import React, {Component} from 'react';
import MainTag from "./main_tag";
import MainArticle from "./main_article";
import MainSubheader from "./main_subheader";
import '../css/mainFeature.css';

class MainFeature extends Component {
    render() {
        return (
            <div className='mainFeature'>
                <div className='featureTag'><MainTag/></div>
                <div className='featureSubHeader'><MainSubheader/></div>
                <div className='featureArticle'><MainArticle/></div>
            </div>
        );
    }
}

export default MainFeature;