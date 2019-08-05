import React, {Component} from 'react';
import '../css/main_abs.css'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class MainAbs extends Component {
    render() {
        return (
            <div className="abs">
                <MDBContainer>
                    <MDBCarousel
                        activeItem={1}
                        length={3}
                        showControls={true}
                        showIndicators={true}
                        className="absCar"
                    >
                        <MDBCarouselInner className='absCa' >
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                                        alt="First slide"
                                    />
                                    <MDBMask overlay="black-light" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive">Light mask</h3>
                                    <p>First text</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                                        alt="Second slide"
                                    />
                                    <MDBMask overlay="black-strong" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive">Strong mask</h3>
                                    <p>Second text</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
                                        alt="Third slide"
                                    />
                                    <MDBMask overlay="black-slight" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h3 className="h3-responsive">Slight Mast</h3>
                                    <p>Third text</p>
                                </MDBCarouselCaption>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>
            </div>
        );
    }
}

export default MainAbs;