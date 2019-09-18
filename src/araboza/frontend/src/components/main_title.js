import React, {Component} from 'react';
import {MDBIcon} from "mdbreact";
import '../css/main_title.css'
import {Link} from 'react-router-dom';
import MainSection from "./main_section";

class MainTitle extends Component {
    render() {
        return (
            <div className='mainTitle'>
                <div className= 'titleHeader'>
                    <h1 className='headTitle'>Title</h1>
                    <div className='mainBoard'></div>
                    <div className='viewContainer'>
                        <div className='viewBox01'>
                                <MainSection />
                            <div className='viewTitle'>Ranking Chart</div>
                            <div className='viewText'>1일전 부터 3일전 까지의 차트 랭킹</div>
                        </div>

                        <div className='viewBox02'>
                            <div className='viewIcon'>
                                <div className='pt-down'><Link to='/feature'><MDBIcon icon="book-open" className='titleIcon'/></Link></div>
                            </div>
                            <div className='viewTitle'>Article</div>
                            <div className='viewText'>1일전 부터 3일전 까지의 차트 랭킹</div>
                        </div>

                        <div className='viewBox03'>
                            <div className='viewIcon'>
                                <Link to='/method'><MDBIcon icon="globe" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>ABS</div>
                            <div className='viewText'>1일전 부터 3일전 까지의 차트 랭킹</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default MainTitle;