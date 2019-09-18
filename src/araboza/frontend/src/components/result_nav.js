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
        this.enableSite = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,];
        this.createSiteButton = this.createSiteButton.bind(this);
        for(let i=0;i<this.props.enableSite.length;i++){
            if(i === this.props.enableSite[i]){
                this.enableSite[this.props.enableSite[i]] = true;
            }
        }
    }

    createSiteButton(){
        // let siteBtn = Object.keys(this.state.enableSiteList).map((i,e)=>{
        //     return(
        //         this.state.enableSiteList[i] ? <div color="inherit" id={`${i}`} key={i} className="site" onClick={() => {
        //                 this.changeSiteData(i);}}>{this.props.siteName[i]}</div> :
        //             <div color="inherit" id={`${i}`} key={i} className="non-active">{this.props.siteName[i]}</div>
        //     );
        // });
        let siteBtn = this.enableSite.map((i,e)=>{
            return(
                this.enableSite[i] ? <div color="inherit" id={`${i}`} key={i}  className="site" onClick={() => {
                        this.changeSiteData(i);}}>{this.props.siteName[i]}</div> :
                    <div color="inherit" id={`${i}`} key={i} className="non-active">{this.props.siteName[i]}</div>
            );
        });
        return siteBtn;
    }
    render() {
        return (
             <div className="nav">
                 { this.createSiteButton() }
             </div>
        );
    }
}

export default Result_nav;