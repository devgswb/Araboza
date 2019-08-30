import React, {Component} from 'react';
import '../css/main_article.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBMask
} from 'mdbreact';

class MainArticle extends Component {
    render() {
        return (
            <div className='article'>
                <div className='articleText'>
                    <h2>ARABOZA 주요 특징</h2>
                </div>
                <div className='article01'>
                    <div className='articleImg01'>
                       <MDBView hover>
                            <img src={require('../img/ArabozaCard01.jpg')} className="img-fluid" alt=""/>
                            <MDBMask className="flex-center" overlay="black-slight">
                                <p className="white-text">Super light overlay</p>
                            </MDBMask>
                        </MDBView>
                    </div>
                    <div className='articleText01'>
                        <h2>Araboza title01</h2>
                        <div>Araboza 특징1</div>
                        <MDBBtn outline color="white"><a href='/#nav'>Search Page</a></MDBBtn>
                    </div>
                </div>
                <div className='article02'>
                    <div className='articleImg02'>
                        <MDBView hover>
                            <img src={require('../img/ArabozaCard02.jpg')} className="img-fluid" alt=""/>
                            <MDBMask className="flex-center" overlay="black-slight">
                                <p className="white-text">Super light overlay</p>
                            </MDBMask>
                        </MDBView>
                    </div>
                     <div className='articleText02'>
                        <h2>Araboza title02</h2>
                         <div>Araboza 특징2</div>
                         <MDBBtn outline color="white"><a href='/#nav'>Search Page</a></MDBBtn>
                    </div>
                </div>
                <div className='article03'>
                    <div className='articleImg03'>
                        <MDBView hover>
                            <img src={require('../img/ArabozaCard03.jpg')} className="img-fluid" alt=""/>
                            <MDBMask className="flex-center" overlay="black-slight">
                                <p className="white-text">Super light overlay</p>
                            </MDBMask>
                        </MDBView>
                    </div>
                     <div className='articleText03'>
                        <h2>Araboza title03</h2>
                         <div>Araboza 특징3</div>
                         <MDBBtn outline color="white"><a href='/#nav'>Search Page</a></MDBBtn>
                    </div>
                </div>
                <div className='article04'>
                    <div className='articleImg04'>
                        <MDBView hover>
                            <img src={require('../img/ArabozaCard04.jpg')} className="img-fluid" alt=""/>
                            <MDBMask className="flex-center" overlay="black-slight">
                                <p className="white-text">Super light overlay</p>
                            </MDBMask>
                        </MDBView>
                    </div>
                     <div className='articleText04'>
                        <h2>Araboza title04</h2>
                         <div>Araboza 특징4</div>
                        <MDBBtn outline color="white"><a href='/#nav'>Search Page</a></MDBBtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainArticle;