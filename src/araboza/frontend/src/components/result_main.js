import React, {Component} from 'react';
import '../css/result_main.css';

import {Redirect, Link} from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import axios from 'axios';

import Result_relationCharts2 from "./result_relationCharts2";
import Result_nav from "./result_nav";
import Result_menu from "./result_menu";
import Result_cardPnchart from "./result_cardPnchart";
import Result_cardRelationchart from "./result_cardRelationchart";
import Result_totalPnchart from "./result_totalPnchart";
import ResultCardLineChart from "./result_cardLineChart";
import ResultCardWordCloud from "./result_cardWordCloud";
import Result_cardTotalPnchart from "./result_cardTotalPnchart";


class result_main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteCode: this.props.location.siteCode,
            rDisplay: 'block',
            wDisplay: 'none',
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.changeSiteData = this.changeSiteData.bind(this);

        this.siteName = {
            1: '보배드림',
            2: '클리앙',
            3: '82쿡',
            4: '개드립',
            5: 'eToLAND',
            6: '가생이',
            7: '웃긴대학',
            8: '해연갤',
            9: '인스티즈',
            10: 'MLBPARK',
            11: '네이트판',
            12: '루리웹',
            13: '더쿠넷',
            14: '오늘의유머',
            15: '와이고수'
        };
    }

    changeSiteData(siteCode) {
        this.setState({
            siteCode: siteCode,
        });
    }

    changeDisplay(mainDisplay, f1Display,) {
        this.setState({
            rDisplay: mainDisplay,
            wDisplay: f1Display,
        })
    }

    handleChange = (e) => {
        let searchStr = e.target.value;
        this.setState({title: searchStr});
    };
    // 데이터를 받아오는 요청, 가져오기
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

    //사이트 버튼 클릭 시 해당 사이트 데이터를 로드하여 차트 최신화
    render() {
        const {data} = this.props.location;
        //데이터가 없을 시 메인으로 리디렉트
        if (data == null || data === 'None') {
            return (
                <Redirect to="/"/>
            );
        }

        let enableSite = [];
        data.map((e, i) => {
            enableSite.push(e.site_code)
        });

        return (
            <div className="back-wrapper">
                <div className="wrapper">

                    <header className="result-header">
                        <Link to="/" className="mobile-title"><div>아라보자</div></Link>
                        {/*<div id="return-main"><Link to="/">검색 페이지로 <h4 id="return-icon">↺</h4></Link></div>*/}
                    </header>

                    <Result_menu/>

                    <div className="result-container">
                        <div id="card-pnChart">
                            <Result_cardPnchart data={data} siteCode={this.state.siteCode} siteName={this.siteName}/>
                        </div>
                        <div id="card-relationChart">
                            <Result_cardRelationchart data={data} siteCode={this.state.siteCode}
                                                      siteName={this.siteName}/>
                        </div>
                        <div id="card-wordCloud">
                            <ResultCardWordCloud/>
                        </div>
                        <div id="card-nav">
                            <Result_nav change={this.changeSiteData} data={data} siteName={this.siteName}
                                        enableSite={enableSite}/>
                        </div>
                        <div id="card-totalPnChart">
                            <Result_cardTotalPnchart data={data} siteName={this.siteName}/>
                        </div>

                        <div id="card-lineChart">
                            <ResultCardLineChart data={data} siteCode={this.state.siteCode}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default result_main;