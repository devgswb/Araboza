import React, {Component} from 'react';
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBIcon
} from "mdbreact";
import '../css/main_absresult.css'

class MainAbsResult extends Component {
    render() {
        return (
            <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={4}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaResultTotal.png')}
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption className='absTextHeader'>
            <h3>선택한 단어의 종합 긍부정 퍼센트를 보여줍니다.</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaResultDifferent.png')}
              alt="Second slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption className='absTextHeader'>
            <h3>각 사이트별로 선택한 단어의 긍부정도를 보여줍니다.</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaResultRanking.png')}
              alt="Third slide"
            />
            <MDBMask overlay="black-light"/>
          </MDBView>
          <MDBCarouselCaption className='absTextHeader'>
            <h3>선택한 단어의 연관된 키워드를 최대 5개까지 보여줍니다.</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId="4">
          <MDBView>
            <img
              className="d-block w-100"
              src={require('../img/arabozaResultHeight.png')}
              alt="Third slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption className='absTextHeader'>
            <h3>최근 한달 간의 선택한 단어의 언급횟수를 보여줍니다.</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
        );
    }
}

export default MainAbsResult;