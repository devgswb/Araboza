import React, {Component} from 'react';
import MainSide from './main_side';
import'../css/main.css';
import MainHeader from "./main_header";
import MainTitle from "./main_title";
import MainCss from "./main_css";
import MainNav from "./main_nav";
import MainBackground from "./main_background";
import MainFeature from "./mainFeature";
import MainMethod from "./mainMethod";
import { Element} from 'react-scroll'
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";


class main extends Component {

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

    state={
        modal2: false,
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        let wWidth = this.state.width;
        let cssDesign;
        let navDesign;
        if(wWidth >= 1150) {
            cssDesign = <div className='_css'><MainCss/></div>;
        }
        else {
        }

        if(wWidth < 520) {
            navDesign =
                    <MDBContainer className='navModel'>
                        <h3> 딥러닝 화제도 분석</h3>
                        <MDBBtn outline color="primary" onClick={this.toggle(2)}>more</MDBBtn>
                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                            <MDBModalHeader toggle={this.toggle(2)}>MDBModal title</MDBModalHeader>
                            <MDBModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn outline color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
        }
        else {
            navDesign = <MainNav/>;
        }

        return (
            <div className='_main'>
                <div className='_bg'>
                    <div className='_ground'><MainBackground/></div>
                </div>
                <div className='_bg2'>
                </div>
                <div className='_bg3'>
                </div>
                <div className='_mainPack'>
                    <div className='_mainContainer'>
                        <div className='_title'><MainTitle/></div>
                        <div className = '_header'><MainHeader/></div>
                        <div className='_nav'>{navDesign}</div>
                        {cssDesign}
                        <div className = '_side'><MainSide/></div>
                    </div>
                    <div className = '_mainFeature'><MainFeature/></div>
                    <Element name="method"  className = '_mainMethod'><MainMethod/></Element>
                </div>
            </div>
        );
    }
}
export default main;