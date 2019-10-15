import React, {Component} from 'react';
import {MDBIcon} from "mdbreact";
import '../css/main_title.css'
import {Link} from "react-scroll";
import MainSection from "./main_section";

class MainTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width : 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width : window.innerWidth
        });
    }

    render() {
        let wWidth = this.state.width;
        let titleBoard;

        if(wWidth > 700) {
            titleBoard =
                <div className='titleHead'>
                        <h1 className='headTitle'>Title</h1>
                        <div className='mainBoard'>
                        </div>
                    </div>
        }
        return (
            <div className='mainTitle'>
                <div className= 'titleHeader'>
                    {titleBoard}
                    <div className='viewContainer'>
                        <div className='viewBox01'>
                            <div className='viewIcon'>
                                <Link activeClass="active" to="ranking" spy={true} smooth={true} offset={50} duration={500}><MDBIcon icon="chart-bar" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>Ranking</div>
                            <div className='viewText'>어제의 검색 단어 순위</div>
                        </div>

                        <div className='viewBox02'>
                            <div className='viewIcon'>
                                <Link activeClass="active" to="feature" spy={true} smooth={true} offset={50} duration={500}><MDBIcon icon="book-open" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>Feature</div>
                            <div className='viewText'>아라보자의 주요 특징</div>
                        </div>

                        <div className='viewBox03'>
                            <div className='viewIcon'>
                                <Link activeClass="active" to="method" spy={true} smooth={true} offset={50} duration={500}><MDBIcon icon="globe" className='titleIcon'/></Link>
                            </div>
                            <div className='viewTitle'>Method</div>
                            <div className='viewText'>아라보자 실행 방법 및 기능 설명</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default MainTitle;