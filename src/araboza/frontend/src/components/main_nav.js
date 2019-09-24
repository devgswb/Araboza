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
                                Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra
                                elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainNav;