import React, {Component} from 'react';
import '../css/main_abs.css'
import {MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import MainAbsMain from "./main_absmain";
import MainAbsResult from "./main_absresult";

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
                                <a onClick={this.toggle(3)}>Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                 <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg" className='mdbHeader'>
                    <MDBModalHeader toggle={this.toggle(1)}><h2>메인 화면</h2></MDBModalHeader>
                    <MDBModalBody>
                        <MainAbsMain/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(1)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" className='mdbHeader'>
                    <MDBModalHeader toggle={this.toggle(2)}><h2>로딩 화면</h2></MDBModalHeader>
                    <MDBModalBody>
                        <img src={require('../img/arabozaRoading.png')} className="cssImg01" alt=""/>
                        <div className='absLoading'>
                        <h3>중지버튼을 누를 시 검색한 단어요청을 중지합니다.</h3>
                        <h3><MDBIcon icon="times" />버튼을 누를 시 모델창은 사라지지만 로딩은 유지 됩니다.</h3>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="lg" className='mdbHeader'>
                    <MDBModalHeader toggle={this.toggle(3)} ><h2>결과 화면</h2></MDBModalHeader>
                    <MDBModalBody>
                        <MainAbsResult/>
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