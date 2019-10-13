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
          <MDBCarouselCaption className='absTextHeader'>
            <h3>단어를 검색 시 그에따른 긍부정도를 분석후 결과를 출력합니다.</h3>
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
          <MDBCarouselCaption className='absTextHeader'>
            <h3>특수문자, 숫자, 영어등 한글 단어가 아닌 것은 형식 오류가 발생하니 주의하세요</h3>
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
          <MDBCarouselCaption className='absTextHeader'>
            <h3>로딩 화면에서 중지버튼을 누를 시 중지가 되었다는 알람창입니다.</h3>
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
          <MDBCarouselCaption className='absTextHeader'>
            <h3>요청한 단어의 값이 부족한 경우에 발생하는 알람창입니다. </h3>
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
          <MDBCarouselCaption className='absTextHeader'>
            <h3>전날 가장 많이 언급된 단어의 순위 입니다.</h3>
            <h3><MDBIcon icon="angle-double-right"/>버튼을 누를 시 순위, 언급 횟 수, 변동순위 등을 자세하게 확인 할 수 있습니다.</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
        );
    }
}

export default MainAbsMain;