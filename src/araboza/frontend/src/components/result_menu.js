import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/result-menu.css'

class Result_menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <Link to="/" className="result-title"><div id="ara">아라</div><div id="boza">보자</div></Link>
                <button id="" className="menu-btn"
                 onClick={() =>{
                     this.props.display('block','none', 'none');
                }}>사이트별 반응</button>
                <button id="" className="menu-btn"
                 onClick={() =>{
                     this.props.display('none','block', 'none');
                }}>한눈에 보기</button>
                <button id="" className="menu-btn" onClick={() =>{
                     this.props.display('none','none', 'block');
                }}>검색량 추이</button>
                <button id="" className="menu-btn">기능4</button>
                <button id="" className="menu-btn">기능5</button>
            </div>
        );
    }
}

export default Result_menu;