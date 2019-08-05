import React, {Component} from 'react';
import '../css/main_article.css'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class MainArticle extends Component {
    render() {
        return (
            <div className='article'>
                <div className= 'articleBody'>
                    <div className='articleTitle'>
                        <h2>ARABOZA 주요 특징</h2>
                    </div>
                    <MDBCol>
                        <MDBCard className='article01'>
                            <MDBCardImage className="img-fluid" src={require('../img/ArabozaCard01.jpg')} alt="" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol>
                        <MDBCard className='article02'>
                            <MDBCardImage className="img-fluid" src={require('../img/ArabozaCard02.jpg')} alt="" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol>
                        <MDBCard className='article03'>
                            <MDBCardImage className="img-fluid" src={require('../img/ArabozaCard03.jpg')} alt="" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol>
                        <MDBCard className='article04'>
                            <MDBCardImage className="img-fluid" src={require('../img/ArabozaCard04.jpg')} alt=""  waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </div>
            </div>
        );
    }
}

export default MainArticle;