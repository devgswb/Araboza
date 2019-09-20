import React, {Component} from 'react';
import {MDBIcon} from "mdbreact";
import '../css/main_title.css'
import {Link} from "react-scroll";
import MainSection from "./main_section";

class MainTitle extends Component {
    render() {
        return (
            <div className='mainTitle'>
                <div className= 'titleHeader'>
                    <h1 className='headTitle'>Title</h1>
                    <div className='mainBoard'>
                    </div>
                    <div className='viewContainer'>
                        <div className='viewBox01'>
                                <MainSection />
                            <div className='viewTitle'>Ranking</div>
                            <div className='viewText'>1일전 부터 3일전 까지의 차트 랭킹</div>
                        </div>

                        <div className='viewBox02'>
                            <div className='viewIcon'>
                                <Link activeClass="active" to="method" spy={true} smooth={true} offset={50} duration={500}><MDBIcon icon="book-open" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>Article</div>
                            <div className='viewText'>아라보자의 주요 특징</div>
                        </div>

                        <div className='viewBox03'>
                            <div className='viewIcon'>
                                <Link activeClass="active" to="feature" spy={true} smooth={true} offset={50} duration={500}><MDBIcon icon="globe" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>ABS</div>
                            <div className='viewText'>아라보자 실행 방법 및 기능 설명</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default MainTitle;