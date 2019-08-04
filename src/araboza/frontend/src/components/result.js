import React, {Component} from 'react';
import '../css/result.css';
import PnCharts from "./pn-charts";
import SiteChart from "./site-charts";
import SiteChart2 from "./site-chart2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadData} from "../action";

/*
1. 캐치할 데이터들
   -단어
   -긍 부정 데이터
   -사이트별 연관 단어
   -날짜


*/


class result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //사이트 차트 보임 여부
            visible: "none",

        };
    }

    loadData() {
        this.props.loadData();
    }

    //사이트 클릭 시 연관 검색어 차트를 보여주기 위한 메서드
    sc_visible = () => {
        if (this.state.visible === "none") {
            this.setState({
                visible: "block"
            })
        }
    };

    //사이트 버튼 클릭 시 해당 사이트 데이터를 로드하여 차트 최신화
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <div className="title">
                        <h1> ARABOZA </h1>
                    </div>
                    <div className="res-intro">
                        <h3>검색 결과는</h3>
                    </div>
                    <div className="pn-chart">
                        <PnCharts/>
                    </div>
                </header>

                <div className="site-chart" style={{display: `${this.state.visible}`}} onChange={
                    (e) => {
                        e.stopPropagation();
                        this.loadData();
                    }
                }>
                    <button id="site-chart-button" onClick={(e) => {
                        this.setState({
                            visible: 'none'
                        })
                    }}>×</button>
                    <SiteChart/>
                    {/*<SiteChart2/>*/}

                </div>


                {/*사이트 버튼들 아이템 리스트 형식으로 숨기기
                아니면 슬라이드나 카드 형식으로
                남초 사이트 - 클릭 - ~~~ 사이트 등장
                여초사이트 ~~~ 등으로*/}

                <div className="site-wrapper">
                    {/*<div id="site-title"><h2>사이트들 통계</h2></div>*/}

                    <div className="n-cho category">

                        <div> <p>남초 사이트</p></div>

                        <button id="mlb-park" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>MLBPark</button>

                        <button id="ruliweb" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>루리웹</button>

                        <button id="ygosu" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>와이고수</button>

                        <button id="dogdrip" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>개드립</button>

                        <button id="cleang" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>클리앙</button>

                        <button id="bobae-dream" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>보배드림</button>

                    </div>

                    <div className="y-cho category">
                        <div><p>여초 사이트</p></div>

                        <button id="instiz" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>인스티즈</button>

                        <button id="82cook" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>82쿡</button>

                        <button id="hygall" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>해연갤</button>


                    </div>


                    <div className="another category">
                        <div><p>그 외</p></div>
                        <button id="natepan" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>네이트판</button>


                        <button id="duku-net" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>더쿠넷</button>

                        <button id="etorrent" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>이토렌트</button>

                        <button id="ou" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>오늘의유머</button>

                        <button id="funny-colleage" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>웃긴대학</button>

                        <button id="gasangei" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>가생이</button>
                    </div>
                </div>
            </div>
        );
    }
}

// Store 가 가진 state 를 어떻게 props 에 엮을지 정하는 함수
// function mapStateToProps(state) {
//     return{
//         dataset: state.resultReducer.dataset
//     }
// }
// // Reducer 에 action 을 알리는 함수 dispatch 를 어떻게 props 에 엮을 지 정하는 함수
// function mapDispatchToProps(dispatch) {
//     return{
//         loadData: bindActionCreators(loadData, dispatch),
//     }
// }
// //위에 두가지가 적용된 props 를 받을 Component 지정
// // Store 에 Reducer 를 연결 시킬 수 있도록 만들어진 Component 가 반환값 (PnCharts)
// PnCharts = connect(mapStateToProps, mapDispatchToProps)(PnCharts);

export default result;