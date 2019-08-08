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
            // data: this.props.location
            site_name:'',
        };
        this.s = true;
        // this.data=this.props.location;
        this.site_name='';
    }

    change_site_data(site_code, site_name){
        // this.data = this.props.data.related_word[i-1];
        // this.site_name = site_name;
        this.setState({
            site_name: site_name
        })
    }
    //사이트 클릭 시 연관 검색어 차트를 보여주기 위한 메서드
    sc_visible = () => {
        if (this.state.visible === "none") {
            this.setState({
                visible: "block"
            })
        }
    };
    componentDidMount() {
         // if(this.s){
         //     this.dataGetFromAPIServer();
         //     this.s=false;
         //     console.log(this.state.data);
         // }
         // axios.get('http://127.0.0.1:8000/api/res/impression/')
         //     .then(response=>{
         //         this.setState({data:response.data[0]});
         //         console.log(response.data);
         //         console.log("Data: " + this.state.data);
         //     })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState);
        if(this.state !== nextState) return true;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        return true;
    }

    //사이트 버튼 클릭 시 해당 사이트 데이터를 로드하여 차트 최신화
    render() {
        const { data } = this.props.location;


        console.log("결과페이지");
        // this.loadData();
        return (
            <div className="back-wrapper">
                <div className="wrapper">
                    <div className="container">
                        <header className="result-header">
                            <div className="title">
                                ARABOZA
                            </div>
                            <div className="res-intro">
                                <h3>{data.search_word}의 결과는??????</h3>
                            </div>
                            <div className="pn-chart">
                                <Result_pnCharts data={data}/>
                                {/*<Result_pnCharts data={this.props.data}/>*/}
                            </div>
                        </header>

                        <div className="site-chart">
                            {/*<Button id="site-chart-Button" onClick={(e) => {*/}
                            {/*    this.setState({*/}
                            {/*        visible: 'none'*/}
                            {/*    })*/}
                            {/*}}>×</Button>*/}
                            <SiteChart data={data} site_name={this.state.site_name}/>
                            {/*<SiteChart2/>*/}
                        </div>


                        {/*사이트 버튼들 아이템 리스트 형식으로 숨기기
                        아니면 슬라이드나 카드 형식으로
                        남초 사이트 - 클릭 - ~~~ 사이트 등장
                        여초사이트 ~~~ 등으로*/}

                        <div className="site-wrapper">
                            {/*<div id="site-title"><h2>사이트들 통계</h2></div>*/}

                            <div className="n-cho category">



                                <button color="primary" id="Mlb-park" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(10, 'MLBPARK');}}>MLBPark</button>

                                <button color="primary" id="Ruliweb" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(12,'루리웹');}}>루리웹</button>

                                <button color="primary" id="YGosu" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(15, '와이고수');}}>와이고수</button>

                                <button color="primary" id="DogDrip" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(4, '개드립');}}>개드립</button>

                                <button color="primary" id="Cleang" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(2, '클리앙');}}>클리앙</button>

                                <button color="primary" id="BoBae-Dream" className="site ncho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(1, '보배드림');}}>보배드림</button>

                            </div>

                            <div className="y-cho category">


                                <button color="secondary" id="Instiz" className="site ycho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(9,'인스티즈');}}>인스티즈</button>

                                <button color="secondary" id="82Cook" className="site ycho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(3,'82쿡');}}>82쿡</button>

                                <button color="secondary" id="HyGall" className="site ycho nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(8,'해연갤');}}>해연갤</button>


                            </div>


                            <div className="another category">

                                <button color="inherit" id="Nate-pan" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(11,'네이트판');}}>네이트판</button>


                                <button bgcolor="inherit" id="TheQoo" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(13,'더쿠넷');}}>더쿠넷</button>

                                <button color="inherit" id="eToLAND" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(5, 'eToLAND');}}>이토랜드</button>

                                <button color="inherit" id="OU" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(14);}}>오늘의유머</button>

                                <button color="inherit" id="Funny-colleage" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(7,'웃긴대학');}}>웃긴대학</button>

                                <button color="inherit" id="GasaengI" className="site other nav-item" onClick={() => {
                                    this.sc_visible();
                                    this.change_site_data(6,'가생이');}}>가생이</button>
                            </div>
                        </div>
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