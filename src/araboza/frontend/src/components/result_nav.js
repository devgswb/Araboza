import React, {Component} from 'react';
import '../css/result_nav.css';

class Result_nav extends Component {
    constructor(props) {
        super(props);
        this.changeSiteData = this.props.change;

        this.enableSite = [...Array(15).keys()].map(x=> {return false});
        this.props.enableSite.map(index=>{
           this.enableSite[index-1] = true;
        });

        this.state=({
            enableSiteList:this.enableSite
        });
        this.createSiteButton = this.createSiteButton.bind(this);

    }

    createSiteButton(){

        let siteButton = this.state.enableSiteList.map((siteCode,index)=>{
            return(
                this.state.enableSiteList[index] ? <div color="inherit" key={index} className="site" onClick={() => {
                        this.changeSiteData(index+1);}}>{this.props.siteName[index+1]}</div> :
                    <div color="inherit" key={index} className="non-active">{this.props.siteName[index+1]}</div>
            );
        });
        return siteButton;
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