import React, {Component} from 'react';
import '../css/main_abs.css'
import {MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import MainAbsMain from "./main_absmain";

class MainAbs extends Component {

    state={
        modal1: false,
        modal2: false,
        modal3: false,
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <div className='absBody'>
                <div className='absContainer'>
                    <div className='absCard'>
                        <div className='view absFace1'>
                            <div className='absText'>
                                <MDBIcon icon="home" className='absIcon'/>
                                <h3>메인화면</h3>
                            </div>
                        </div>
                        <div className='view absFace2'>
                            <div className='absText'>
                                <p>설명란</p>
                                <a onClick={this.toggle(1)}>Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className='absCard'>
                        <div className='view absFace1'>
                            <div className='absText'>
                                <MDBIcon icon="redo" className='absIcon'/>
                                <h3>로딩화면</h3>
                            </div>
                        </div>
                        <div className='view absFace2'>
                            <div className='absText'>
                                <p>설명란</p>
                                <a onClick={this.toggle(2)}>Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className='absCard'>
                        <div className='view absFace1'>
                            <div className='absText'>
                                <MDBIcon icon="th" className='absIcon'/>
                                <h3>결과화면</h3>
                            </div>
                        </div>
                        <div className='view absFace2'>
                            <div className='absText'>
                                <p>설명란</p>
                                <a onClick={this.toggle(3)}>Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                 <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg">
                    <MDBModalHeader toggle={this.toggle(1)}>메인 화면</MDBModalHeader>
                    <MDBModalBody>
                        <MainAbsMain/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(1)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
                    <MDBModalHeader toggle={this.toggle(2)}>로딩 화면</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="lg">
                    <MDBModalHeader toggle={this.toggle(3)}>결과 화면</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(3)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

export default MainAbs;