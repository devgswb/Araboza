import React, {Component,Fragment} from 'react';
import '../css/result_nav.css';
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import {  MDBAlert } from 'mdbreact';


class Result_nav extends Component {
    constructor(props) {
        super(props);
        this.changeSiteData = this.props.change;
        this.state=({
           alert:false
        });

        this.enableSite = [];
        this.changeAlert = this.changeAlert.bind(this);
        this.createSiteButton = this.createSiteButton.bind(this);
    }
    changeAlert(){
        this.setState({
            alert:!this.state.alert
        });
        setTimeout(()=>{
            this.setState({
                alert:!this.state.alert
            })
        }, 3000);

    }
    createSiteButton(){
        this.enableSite = [...Array(15).keys()].map(x=> {return false});
        this.props.enableSite.map(index=>{
           this.enableSite[index-1] = true;
        });

        return this.enableSite.map((tabEnable,index)=>{
            tabEnable = index + 1;
            // if (tabEnable === 9 || tabEnable ===7) {
            //     return ('');
            // }
            return(
                this.enableSite[index] ? <div color="inherit" key={index} className="site" onClick={() => {
                        this.changeSiteData(index+1);}}>{this.props.siteName[index+1]}</div>:
                    <div color="inherit" key={index} className="non-active" onClick={(e)=>{
                        if(!this.state.alert) this.changeAlert();
                    }}>{this.props.siteName[index+1]}</div>
            );
        });
    }

    render() {
        let alert;
        if(this.state.alert){
            alert=<MDBAlert color="info" className="nav-alert">
                데이터가 너무 적어서 불러오지 않았어요!
            </MDBAlert>;
        }else{
            alert='';
        }

        return (
            <Fragment>
                {alert}
                 <div className="nav">
                     <div className="navArrow">
                         <div id="arrowLeft">❮</div>
                         <div id="arrowRight">❯</div>
                     </div>
                     { this.createSiteButton() }

                 </div>
            </Fragment>
        );
    }
}

export default Result_nav;