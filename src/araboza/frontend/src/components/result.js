import React, {Component} from 'react';
import '../css/result.css';
import PnCharts from "./pn-charts";
import SiteChart from "./site-charts";

class result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //사이트 차트 보임 여부
            visible: "none"
        };
    }

    //사이트 클릭 시 연관 검색어 차트를 보여주기 위한 메서드
    sc_visible =()=>{
        if(this.state.visible === "none"){
            this.setState({
                visible : "block"
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

                <div className="site-chart" style={{display: `${this.state.visible}`}}>
                    <SiteChart/>
                </div>

                <div className="site-wrapper">
                    <div id="site-title"><h2>사이트들 통계</h2></div>

                    <button id="hygall" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>해연갤</button>

                    <button id="ruliweb" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>루리웹</button>

                    <button id="instiz" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>인스티즈</button>

                    <button id="cleang" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>클리앙</button>

                    <button id="natepan" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>네이트판</button>

                    <button id="mlb-park" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>MLBPark</button>

                    <button id="duku-net" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>더쿠넷</button>

                    <button id="etorrent" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>이토렌트</button>

                    <button id="ou" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>오늘의유머</button>

                    <button id="funny-colleage" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>웃긴대학</button>

                    <button id="bobae-dream" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>보배드림</button>

                    <button id="ygosu" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>와이고수</button>

                    <button id="dogdrip" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>개드립</button>

                    <button id="gasangei" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>가생이</button>

                    <button id="82cook" className="site" onClick={()=>{
                        this.sc_visible();
                    }}>82쿡</button>

                </div>
            </div>
        );
    }
}

export default result;