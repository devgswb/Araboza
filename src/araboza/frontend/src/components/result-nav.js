import React, {Component} from 'react';
import '../css/result-nav.css';

class ResultNav extends Component {
    constructor(props) {
        super(props);
        this.change_site_data = this.props.change;
    }

    render() {
        return (
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

                    <div color="inherit" id="TheQoo" className="site" href=".site-chart" onClick={() => {
                        this.change_site_data(13,'더쿠넷');}}>더쿠넷</div>

                    <div color="inherit" id="OU" className="site" href=".site-chart" onClick={() => {
                        this.change_site_data(14,'오늘의유머');}}>오늘의유머</div>

                    <div color="primary" id="YGosu" className="site" href=".site-chart" onClick={() => {
                        this.change_site_data(15, '와이고수');}}>와이고수</div>

                    <div color="primary" id="YGosu" className="site" href=".site-chart" onClick={() => {
                        this.change_site_data(16, '전체');}}>사이트종합</div>

                </div>
        );
    }
}

export default ResultNav;