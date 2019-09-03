import React, {Component} from 'react';
import '../css/result_main.css';
import Result_pnCharts from "./result_pn-charts";
import SiteChart from "./result_relation-charts";
import {Redirect} from 'react-router-dom';



import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import axios from 'axios';

import SiteChart2 from "./site-chart2";
import ResultNav from "./result-nav";
import ResultMenu from "./result-menu";
import ResultCardPnchart from "./result-card-pnchart";
import ResultCardRelationchart from "./result-card-relationchart";
import Result_totalPnchart from "./result_total-pnchart";

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
            display:'none',
            rdisplay:'block',
        };
        this.s = true;
        this.handleChange = this.handleChange.bind(this);
        this.change_site_data = this.change_site_data.bind(this);
        this.change_display = this.change_display.bind(this);
        // this.data=this.props.location;
    }

    change_site_data(site_code, site_name){
        this.setState({
            site_name: site_name
        });
        console.log(site_name);
    }
    change_display(display, rdisplay){
        this.setState({
            display: display,
            rdisplay: rdisplay,
        })
    }
    handleChange = (e)=>{
        let searchStr = e.target.value;
        this.setState({ title : searchStr });
    };
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

        return (
            <div className="back-wrapper">
                <div className="wrapper">

                    <header className="result-header">
                        <div className="mobile-title">아라보자</div>
                        {/*<div id="return-main"><Link to="/">검색 페이지로 <h4 id="return-icon">↺</h4></Link></div>*/}
                    </header>

                    <ResultMenu display={this.change_display}/>

                    <div id="card-total-pnchart" style={{display:`${this.state.display}`}}>
                        <Result_totalPnchart/>
                    </div>

                    <div className="result-container"  style={{display:`${this.state.rdisplay}`}}>

                        <ResultCardPnchart data={data}/>
                        <div className="site-chart-wrap">
                          <ResultCardRelationchart data={data} site_name={this.state.site_name}/>
                        </div>
                        <div className="nav">
                            <ResultNav change={this.change_site_data}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default result_main;