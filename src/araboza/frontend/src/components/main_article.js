import React, {Component} from 'react';
import '../css/main_article.css';
import {MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBBtn} from "mdbreact";
import { Element} from 'react-scroll'

class MainArticle extends Component {

    state={
        modal6: false,
        modal7: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <Element name='feature'>
            <div className='article'>
                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard01.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="brain" className='featureIcon'/>
                            <h3>주요 특징1</h3>
                            <a href="#" onClick={this.toggle(10)}>Read</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard02.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="user-minus" className='featureIcon'/>
                            <h3>주요 특징2</h3>
                            <a href="#" onClick={this.toggle(2)}>Read</a>
                        </div>
                    </div>
                </div>
                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard03.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="mobile-alt"  className='featureIcon'/>
                            <h3>주요 특징3</h3>
                            <a href="#" onClick={this.toggle(3)}>Read</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard04.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="database" className='featureIcon'/>
                            <h3>주요 특징4</h3>
                            <a href="#" onClick={this.toggle(4)}>Read</a>
                        </div>
                    </div>
                </div>
            </div>
                <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} frame position="bottom" backdrop={false}>
                    <MDBModalHeader toggle={this.toggle(10)}>11111111111111</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(10)}>Close</MDBBtn>
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
            </Element>
        );
    }
}

export default MainArticle;