import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/result-menu.css'
import Result_totalPnchart from "./result_total-pnchart";

class ResultMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <Link to="/" className="result-title"><div>아라보자</div></Link>
                <button id="" className="menu-btn"
                 onClick={() =>{
                     this.props.display('block','none');
                }}>한 눈에 보기</button>
                <button id="" className="menu-btn"
                onClick={() =>{
                     this.props.display('none','block');
                }}>사이트별</button>
                <button id="" className="menu-btn">기능3</button>
                <button id="" className="menu-btn">기능4</button>
                <button id="" className="menu-btn">기능5</button>
            </div>
        );
    }
}

export default ResultMenu;