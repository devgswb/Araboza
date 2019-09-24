import React, {Component} from 'react';
import '../css/result_nav.css';
import { MDBContainer, MDBAlert } from 'mdbreact';

class Result_nav extends Component {
    constructor(props) {
        super(props);
        this.changeSiteData = this.props.change;

        this.enableSite = [];


        this.createSiteButton = this.createSiteButton.bind(this);
    }

    // createSiteButton(){
    //     this.enableSite = [...Array(15).keys()].map(x=> {return false});
    //     this.props.enableSite.map(index=>{
    //        this.enableSite[index-1] = true;
    //     });
    //
    //     return this.enableSite.map((siteCode,index)=>{
    //         return(
    //             this.enableSite[index] ? <div color="inherit" key={index} className="site" onClick={() => {
    //                     this.changeSiteData(index+1);}}>{this.props.siteName[index+1]}</div> :
    //                 <div color="inherit" key={index} className="non-active" tooltip-text="이 사이트의 데이터는 조건을 충족하지 않아 불러오지 않았습니다">{this.props.siteName[index+1]}</div>
    //         );
    //     });
    // }
    createSiteButton(){
        this.enableSite = [...Array(15).keys()].map(x=> {return false});
        this.props.enableSite.map(index=>{
           this.enableSite[index-1] = true;
        });

        return this.enableSite.map((siteCode,index)=>{
            return(
                this.enableSite[index] ? <div color="inherit" key={index} className="site" onClick={() => {
                        this.changeSiteData(index+1);}}>{this.props.siteName[index+1]}</div> :
                    <div color="inherit" key={index} className="non-active" onClick={(e)=>{
                        return(
                            <MDBAlert color="info" id="nav-modal" dismiss>
                                데이터가 너무 적어서 불러오지 않았어요!
                            </MDBAlert>
                        )
                    }}>{this.props.siteName[index+1]}</div>
            );
        });
    }
    // componentWillMount() {
    //     return(
    //         <div className="nav">
    //              { this.createSiteButton() }
    //          </div>
    //     )
    // }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     if(this.props.enableSite !== nextProps.enableSite){
    //         console.log("createBtn");
    //
    //         return(
    //             <div className="nav">
    //                 { this.createSiteButton() }
    //             </div>
    //         )
    //     }
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