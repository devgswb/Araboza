import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/result_menu.css'

class Result_menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <Link to="/" className="result-title"><div id="ara">아라</div><div id="boza">보자</div></Link>
                <button id="" className="menu-btn" href="#card-pnChart">사이트별 반응</button>
                <button id="" className="menu-btn" href="#card-totalPnChart">한눈에 보기</button>
                <button id="" className="menu-btn">검색량 추이</button>

            </div>
        );
    }
}

export default Result_menu;