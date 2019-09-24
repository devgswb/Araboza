import React, {Component} from 'react';
import {MDBIcon} from "mdbreact";
import '../css/main_nav.css'

class MainNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width : 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
        return (
            <div className='nav'>
                <div className='navBox'>
                    <MDBIcon className='navIcon i2' icon="angle-double-right" />
                    <div className='navText'>
                        <MDBIcon className='navIcon i1' icon="angle-double-left" />
                        <div>
                            <h2>딥러닝을 이용한 화제도 분석</h2>
                            <p>
                                “아라보자”는 온라인 상에서 특정 기간 동안 가장 화제가 된 키워드를 분석하여
                                분석한 키워드의 화제성을 알아 볼 수 있는 Web Application
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainNav;