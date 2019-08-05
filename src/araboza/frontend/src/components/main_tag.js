import React, {Component} from 'react';
import '../css/main_tag.css'
class MainTag extends Component {
    render() {
        return (
            <div className='tag'>
                <div className= '_tagTitle'><h2>ARABOZA</h2></div>
                <div className= '_tagName01'><a href="#article">주요 특징</a></div>
                <div className= '_tagName02'><a href="#abs">실행 방법</a></div>
            </div>
        );
    }
}

export default MainTag;