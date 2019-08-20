import React, {Component} from 'react';
import '../css/result_main.css';
import Result_pnCharts from "./result_pn-charts";
import SiteChart from "./result_site-charts";
import {Redirect} from 'react-router-dom';

import { Link } from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {MDBNavbar} from 'mdbreact';

import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadData} from "../action";
import SiteChart2 from "./site-chart2";

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
            // data: this.props.location
            site_name:'보배드림',
        };
        this.s = true;
        // this.data=this.props.location;
    }

    change_site_data(site_code, site_name){
        this.setState({
            site_name: site_name
        })
    }

    // componentDidMount() {
    //      if(this.s){
    //          this.dataGetFromAPIServer();
    //          this.s=false;
    //          console.log(this.state.data);
    //      }
    //      axios.get('http://127.0.0.1:8000/api/res/impression/')
    //          .then(response=>{
    //              this.setState({data:response.data[0]});
    //              console.log(response.data);
    //              console.log("Data: " + this.state.data);
    //          })
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState);
        if(this.state !== nextState) return true;
    }

    //사이트 버튼 클릭 시 해당 사이트 데이터를 로드하여 차트 최신화
    render() {
        const { data } = this.props.location;

        if(data == null || data === 'None'){
            return(
                <Redirect to ="/"/>
            );
        }

        console.log("결과페이지");

        return (
            <div className="back-wrapper">
                <div className="wrapper">

                    <header className="result-header">
                        <div className="mobile-title">ARABOZA</div>
                        <div id="return-main"><Link to="/">검색 페이지로 <h4 id="return-icon">↺</h4></Link></div>
                    </header>

                    <div className="menu-wrapper">
                        <div className="result-title">ARABOZA</div>
                        <button color="primary" id="" className="menu-btn">기능버튼</button>
                        <button color="primary" id="" className="menu-btn">기능버튼</button>
                        <button color="primary" id="" className="menu-btn">기능버튼</button>
                        <button color="primary" id="" className="menu-btn">기능버튼</button>
                        <button color="primary" id="" className="menu-btn">기능버튼</button>
                    </div>

                    <div className="result-container">
                        <div className="pn-chart">
                            <div className="res-intro">
                                {data.search_word}을(를) {data.total_sentence_count}개의 문장에서 검색한 결과
                            </div>
                            <Result_pnCharts data={data}/>
                        </div>

                        <div className="site-chart">
                            <div className="res-intro">{this.state.site_name}의 연관검색어</div>
                            <SiteChart data={data} site_name={this.state.site_name} />
                        </div>

                        <div className="nav">

                            <div color="primary" id="BoBae-Dream" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(1, '보배드림');}}>보배드림</div>

                            <div color="primary" id="Cleang" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(2, '클리앙');}}>클리앙</div>

                            <div color="secondary" id="82Cook" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(3,'82쿡');}}>82쿡</div>

                            <div color="primary" id="DogDrip" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(4, '개드립');}}>개드립</div>

                            <div color="inherit" id="eToLAND" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(5, 'eToLAND');}}>이토랜드</div>

                            <div color="inherit" id="GasaengI" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(6,'가생이');}}>가생이</div>

                            <div color="inherit" id="Funny-colleage" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(7,'웃긴대학');}}>웃긴대학</div>

                            <div color="secondary" id="HyGall" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(8,'해연갤');}}>해연갤</div>

                            <div color="secondary" id="Instiz" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(9,'인스티즈');}}>인스티즈</div>

                            <div color="primary" id="Mlb-park" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(10, 'MLBPARK');}}>MLBPark</div>

                            <div color="inherit" id="Nate-pan" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(11,'네이트판');}}>네이트판</div>

                            <div color="primary" id="Ruliweb" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(12,'루리웹');}}>루리웹</div>

                            <div bgcolor="inherit" id="TheQoo" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(13,'더쿠넷');}}>더쿠넷</div>

                            <div color="inherit" id="OU" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(14,'오늘의유머');}}>오늘의유머</div>

                            <div color="primary" id="YGosu" className="site" href=".site-chart" onClick={() => {
                                this.change_site_data(15, '와이고수');}}>와이고수</div>

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