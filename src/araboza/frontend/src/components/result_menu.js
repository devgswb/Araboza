import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Link as Link2}  from 'react-scroll';
import '../css/result_menu.css'

class Result_menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <Link to="/" className="result-title"><div id="ara">아라</div><div id="boza">보자</div></Link>

                <Link2 className="menu-btn" activeClass="active" to="cardPnChart" spy={true} smooth={true} offset={50} duration={500}>사이트별 화제도</Link2>
                <Link2 className="menu-btn" activeClass="active" to="cardLineChart" spy={true} smooth={true} offset={50} duration={500}>언급량 변화도</Link2>
                <Link2 className="menu-btn" activeClass="active" to="cardTotalPnChart" spy={true} smooth={true} offset={50} duration={500}>화제도 한눈에 보기</Link2>

            </div>
        );
    }
}

export default Result_menu;