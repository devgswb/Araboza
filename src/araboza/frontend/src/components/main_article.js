import React, {Component} from 'react';
import '../css/main_article.css';
import {MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBBtn} from "mdbreact";

class MainArticle extends Component {

    state={
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <div>
            <div className='article'>
                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard01.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="globe" className='titleIcon'/>
                            <h3>주요 특징1</h3>
                            <a href="#" onClick={this.toggle(1)}>Read More</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard02.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="globe" className='titleIcon'/>
                            <h3>주요 특징1</h3>
                            <a href="#" onClick={this.toggle(2)}>Read More</a>
                        </div>
                    </div>
                </div>
                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard03.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="globe" className='titleIcon'/>
                            <h3>주요 특징1</h3>
                            <a href="#" onClick={this.toggle(3)}>Read More</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard04.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="globe" className='titleIcon'/>
                            <h3>주요 특징1</h3>
                            <a href="#" onClick={this.toggle(4)}>Read More</a>
                        </div>
                    </div>
                </div>
            </div>
                <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle(1)}>11111111111111</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(1)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle(2)}>2222222222222</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="lg" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle(3)}>33333333333</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(3)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle(4)}>4444444444444</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

export default MainArticle;