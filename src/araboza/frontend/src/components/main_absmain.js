import React, {Component} from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";
import '../css/main_absmain.css'

class MainAbsMain extends Component {
    render() {
        return (
            <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={5}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaMainSearch.png')}
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaMainSearchForm.png')}
              alt="Second slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaMainSearchCancel.png')}
              alt="Third slide"
            />
            <MDBMask overlay="black-light"/>
          </MDBView>
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="4">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaMainSearchError.png')}
              alt="Third slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="5">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaMainRanking.png')}
              alt="Third slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
        );
    }
}

export default MainAbsMain;