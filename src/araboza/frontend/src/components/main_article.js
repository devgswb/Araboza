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
                            <h3>딥러닝 활용</h3>
                            <a onClick={this.toggle(1)}>Read</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard02.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="database" className='featureIcon'/>
                            <h3>빅데이터 분석</h3>
                            <a onClick={this.toggle(2)}>Read</a>
                        </div>
                    </div>
                </div>
                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard03.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="user-minus" className='featureIcon'/>
                            <h3>긍부정 검사</h3>
                            <a onClick={this.toggle(3)}>Read</a>
                        </div>
                    </div>
                </div>

                <div className='articleBox'>
                    <div className='articleImg'>
                        <img src={require('../img/ArabozaCard04.jpg')} className="cssImg01" alt=""/>
                    </div>
                    <div className='articleDetail'>
                        <div className='articleIcon'>
                            <MDBIcon icon="mobile-alt"  className='featureIcon'/>
                            <h3>반응형 지원</h3>
                            <a onClick={this.toggle(4)}>Read</a>
                        </div>
                    </div>
                </div>
            </div>
                <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg" backdrop={false} className='articleT'>
                    <MDBModalHeader toggle={this.toggle(10)}>딥러닝 활용</MDBModalHeader>
                    <MDBModalBody>
                        딥러닝을 활용하여 단어의 긍정과 부정을 분석하고 단어와 연관된 단어 또한 불러온다
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(1)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" backdrop={false} className='articleT'>
                    <MDBModalHeader toggle={this.toggle(2)}>빅데이터 분석</MDBModalHeader>
                    <MDBModalBody>
                        각 커뮤니티 사이트의 제목들을 긁어 단어를 분석한다.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="lg" backdrop={false} className='articleT'>
                    <MDBModalHeader toggle={this.toggle(3)}>긍부정 검사</MDBModalHeader>
                    <MDBModalBody>
                        키워드에 대한 긍정도와 부정 분석도를 확인한다.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(3)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg" backdrop={false} className='articleT'>
                    <MDBModalHeader toggle={this.toggle(4)}>반응형 지원</MDBModalHeader>
                    <MDBModalBody>
                        Web 기반으로 설계되어 플랫폼에 상관 없이 동일한 환경에서 이용할 수 있으며 Pc, Moblie, 태블릿에 따라 각기 다른
                        화면 지원
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