import React, {Component} from 'react';
import '../css/result-nav.css';

class Result_nav extends Component {
    constructor(props) {
        super(props);
        this.changeSiteData = this.props.change;
        this.state=({
            enableSiteList:{
                1:false,
                2:false,
                3:false,
                4:false,
                5:false,
                6:false,
                7:false,
                8:false,
                9:false,
                10:false,
                11:false,
                12:false,
                13:false,
                14:false,
                15:false,
            }
        });
        this.enableSite = [];
        // this.setState({
        //     enableSiteList: this.createEnableSite([1,3,4])
        // });

        this.createSiteButton = this.createSiteButton.bind(this);
        // this.createEnableSite = this.createEnableSite.bind(this);
        // for(let siteCode=0;siteCode<this.props.enableSite.length;siteCode++){
        //     if(siteCode === this.props.enableSite[siteCode]){
        //         this.enableSite[this.props.enableSite[siteCode]] = true;
        //     }
        // }
    }
    // createEnableSite(enableList) {
    //         let resultList = [...Array(15).keys()].map((elements, e) => {
    //             return elements+1;
    //         });
    //         return resultList.map((elements, e) => {
    //             if (enableList.indexOf(elements) > -1) {
    //                 return true;
    //             }
    //             return {elements:false};
    //         });
    // }
    createSiteButton(){
        // let siteBtn = Object.keys(this.state.enableSiteList).map((i,e)=>{
        //     return(
        //         this.state.enableSiteList[i] ? <div color="inherit" id={`${i}`} key={i} className="site" onClick={() => {
        //                 this.changeSiteData(i);}}>{this.props.siteName[i]}</div> :
        //             <div color="inherit" id={`${i}`} key={i} className="non-active">{this.props.siteName[i]}</div>
        //     );
        // });
        let siteBtn = this.enableSite.map((siteCode,e)=>{
            return(
                this.enableSite[siteCode] ? <div color="inherit" id={`${siteCode}`} key={siteCode}  className="site" onClick={() => {
                        this.changeSiteData(siteCode);}}>{this.props.siteName[siteCode]}</div> :
                    <div color="inherit" id={`${siteCode}`} key={siteCode} className="non-active">{this.props.siteName[siteCode]}</div>
            );
        });
        return siteBtn;
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.createEnableSite(this.state.enableSiteList);
    //     console.log(this.state.enableSiteList);
    // }


    render() {

        return (
             <div className="nav">
                 { this.createSiteButton() }
             </div>
        );
    }
}

export default Result_nav;