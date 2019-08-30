import React, {Component} from 'react';
import MainSide from './main_side';
import'../css/main.css';
import MainAbs from "./main_abs";
import MainSection from "./main_section";
import MainHeader from "./main_header";
import MainArticle from "./main_article";
import MainTag from "./main_tag";
import {MDBContainer, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter} from 'mdbreact';
import MainNext from "./main_next";
class main extends Component {

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
        let wWidth = window.innerWidth;
        let text;
        console.log(wWidth);
        if (wWidth <= 500) {
             text =
                <MDBContainer className ='navBtn'>
                    <MDBBtn outline color="primary" onClick={this.toggle(2)}>MORE</MDBBtn>
                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                        <MDBModalHeader toggle={this.toggle(2)}>화제도 분석</MDBModalHeader>
                        <MDBModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
        }
        else {
            text =
                <div>
                    <div>Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra </div>
                    <div>elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada. Praesent in sem ex. Morbi mattis sapien pretium tellus </div>
                    <div>venenatis, at egestas urna ornare.</div>
                </div>
        }
        return (
            <div className='_main'>
                <div className = '_mainContainer'>
                    <div className= '_mainDiv1'>
                        <div className = '_mainTitle'>
                            <div className = '_tag'>
                                <MainTag />
                            </div>
                            <div className = '_header' id='header'>
                                <MainHeader/>
                            </div>
                            <div className='_nav' id='nav'>
                                <h2>딥러닝을 이용한 화제도 분석</h2>
                                {text}
                            </div>
                        </div>
                        /*
                        <div className = '_next'>
                            <MainNext/>
                        </div>
                         */
                        <div className = '_mainSearch'>
                            <div className = '_side'>
                                <MainSide/>
                            </div>
                            <div className = '_section'>
                                <MainSection/>
                            </div>
                        </div>
                    </div>

                    <div className= '_mainDiv2'>
                        <div className='_abs' id='abs'>
                            <MainAbs/>
                        </div>
                        <div className = '_article' id='article'>
                            <MainArticle/>
                        </div>

                        <div className = '_footer'>footer</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default main;