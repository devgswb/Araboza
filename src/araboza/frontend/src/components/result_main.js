import React, {Component} from 'react';
import '../css/result_main.css';
import Result_pnCharts from "./result_pn-charts";
import SiteChart from "./result_site-charts";

import Button from '@material-ui/core/Button';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadData} from "../action";

/*
1. 캐치할 데이터들
   -사이트별 식별 코드
   -사이트별 긍부정 데이터
   -사이트별 연관 단어들

   -탭 형식으로 사이트 리스트를 만들어 탭 선택시
    긍부정 차트, 파이 차트 동시에 바뀌게
*/

class result_main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //사이트 차트 보임 여부
            visible: "none",
            data: {
                positive: 0.0,
                negative: 0.0
            }
        };
        this.s = true;
    }

    //사이트 클릭 시 연관 검색어 차트를 보여주기 위한 메서드
    sc_visible = () => {
        if (this.state.visible === "none") {
            this.setState({
                visible: "block"
            })
        }
    };
     async dataGetFromAPIServer() {
        try {
            // Backend (django 서버)의 api/res/impression의 json 데이터를 비동기 방식(await)로 받아오는 부분이다.
            // 이번 프로젝트의 데이터 전달 방식으로 핵심적인 로직이 될 것!
            const res = await fetch('http://127.0.0.1:8000/api/res/impression/', { mode: "cors" });
            const data = await res.json();
            this.setState({data: data[0]});
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
         if(this.s){
             this.dataGetFromAPIServer();
             this.s=false;
             console.log(this.state.data);
         }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState);
        if(this.state !== nextState) return true;
    }


    //사이트 버튼 클릭 시 해당 사이트 데이터를 로드하여 차트 최신화
    render() {
        console.log('state = '+this.state.data.positive);
        // this.loadData();
        return (
            <div className="wrapper">
                <header className="result-header">
                    <div className="title">
                        ARABOZA
                    </div>
                    <div className="res-intro">
                        <h3>{this.props.match.params.title}의 결과는??????</h3>
                    </div>
                    <div className="pn-chart">
                        <Result_pnCharts positive={this.state.data.positive} negative={this.state.data.negative} data={this.state.data}/>
                    </div>
                </header>

                <div className="site-chart" style={{display: `${this.state.visible}`}}>
                    <Button id="site-chart-Button" onClick={(e) => {
                        this.setState({
                            visible: 'none'
                        })
                    }}>×</Button>
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

                        <div className="site-div"> 남초 사이트</div>

                        <Button outline color="primary" id="mlb-park" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>MLBPark</Button>

                        <Button outline color="primary" id="ruliweb" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>루리웹</Button>

                        <Button outline color="primary" id="ygosu" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>와이고수</Button>

                        <Button outline color="primary" id="dogdrip" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>개드립</Button>

                        <Button outline color="primary" id="cleang" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>클리앙</Button>

                        <Button outline color="primary" id="bobae-dream" className="site ncho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>보배드림</Button>

                    </div>

                    <div className="y-cho category">
                        <div className="site-div">여초 사이트</div>

                        <Button outline color="secondary" id="instiz" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>인스티즈</Button>

                        <Button outline color="secondary" id="82cook" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>82쿡</Button>

                        <Button outline color="secondary" id="hygall" className="site ycho nav-item" onClick={() => {
                            this.sc_visible();
                        }}>해연갤</Button>


                    </div>


                    <div className="another category">
                        <div className="site-div">그 외</div>
                        <button outline color="info" id="natepan" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>네이트판</button>


                        <button outline color="info" id="duku-net" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>더쿠넷</button>

                        <button outline color="info" id="etorrent" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>이토렌트</button>

                        <button outline color="info" id="ou" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>오늘의유머</button>

                        <button outline color="info" id="funny-colleage" className="site other nav-item" onClick={() => {
                            this.sc_visible();
                        }}>웃긴대학</button>

                        <button outline color="info" id="gasangei" className="site other nav-item" onClick={() => {
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
//         data: state.resultReducer.data
//     }
// }
// // Reducer 에 action 을 알리는 함수 dispatch 를 어떻게 props 에 엮을 지 정하는 함수
// function mapDispatchToProps(dispatch) {
//     return{
//         loadData: bindActionCreators(loadData, dispatch),
//     }
// }
// //위에 두가지가 적용된 props 를 받을 Component 지정
// // Store 에 Reducer 를 연결 시킬 수 있도록 만들어진 Component 가 반환값 (Result_pnCharts)
// result_main = connect(mapStateToProps, mapDispatchToProps)(result_main);

export default result_main;