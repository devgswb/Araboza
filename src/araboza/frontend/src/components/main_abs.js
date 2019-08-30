import React, {Component} from 'react';
import '../css/main_abs.css'
import {
    MDBCarousel,
    MDBCarouselCaption,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBMask,
    MDBContainer,
    MDBBtn, MDBModalFooter, MDBModalBody, MDBModalHeader, MDBModal
} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class MainAbs extends Component {

    state={
        modal5: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <div className="abs">
                <div className="absTitle"><h2>ARABOZA 실행 방법</h2></div>
                <div className="absView">
                    <MDBContainer>
                        <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true}>
                            <MDBCarouselInner className='absCa' >
                                <MDBCarouselItem itemId="1">
                                    <MDBView>
                                        <img src={require('../img/ArabozaPlay01.png')} alt="First slide"/>
                                        <MDBMask overlay="black-light" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive">Light mask</h3>
                                        <p>First text</p>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem itemId="2">
                                    <MDBView>
                                        <img src={require('../img/ArabozaPlay02.png')} alt="Second slide"/>
                                        <MDBMask overlay="black-strong" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive">Light mask</h3>
                                        <MDBBtn color="primary" onClick={this.toggle(5)}>Fluid modal</MDBBtn>
                                        <MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} size="fluid">
                                            <MDBModalHeader toggle={this.toggle(5)}>MDBModal title</MDBModalHeader>
                                            <MDBModalBody>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat.
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={this.toggle(5)}>Close</MDBBtn>
                                                <MDBBtn color="primary">Save changes</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem itemId="3">
                                    <MDBView>
                                        <img src={require('../img/ArabozaPlay03.png')} alt="Third slide"/>
                                        <MDBMask overlay="black-light" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive">Light mask</h3>
                                        <p>First text</p>
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </MDBContainer>
                </div>
                <div className="absText01">
                    <h3>방법1</h3>
                </div>
                <div className="absText02">
                    <h3>방법2</h3>
                </div>
                <div className="absText03">
                    <h3>방법3</h3>
                </div>
                <div className="absText04">
                    <h3>방법4</h3>
                </div>
            </div>
        );
    }
}

export default MainAbs;