import React, {Component} from 'react';
import { MDBNavbar, MDBContainer, MDBNavLink, MDBNavItem, MDBNavbarToggler, MDBNavbarBrand, MDBNavbarNav, MDBCollapse }
from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/main_tag.css'
class MainTag extends Component {
    state = {
         navbarCollapse5: '',
    };

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    };

    render() {
        const wWidth = window.innerWidth;
        let tag;
        if(wWidth <= 500) {
            tag =
                <Router>
                 <MDBNavbar color="black" style={{ marginTop: '0' }} >
                     <MDBContainer>
                         <MDBNavbarBrand className="_tagTitle white-text">
                             <h2>ARABOZA</h2>
                         </MDBNavbarBrand>
                         <MDBNavbarToggler image="https://mdbootstrap.com/img/svg/hamburger7.svg?color=BFE100" onClick={this.toggleCollapse('navbarCollapse5')} />
                         <MDBCollapse id="navbarCollapse5" isOpen={this.state.collapseID} navbar>
                             <MDBNavbarNav left>
                                 <MDBNavItem active>
                                     <a href ="/#article" className='_tagName01'>주요 특징</a>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                     <a href ="/#abs" className='_tagName02'>실행 방법</a>
                                 </MDBNavItem>
                             </MDBNavbarNav>
                         </MDBCollapse>
                     </MDBContainer>
                 </MDBNavbar>
                </Router>
        }
        else {
            tag =
                <div className='tag'>
                    <div className= '_tagTitle'><h2>ARABOZA</h2></div>
                    <div className= '_tagName01'><a href="#article">주요 특징</a></div>
                    <div className= '_tagName02'><a href="#abs">실행 방법</a></div>
                </div>
        }

        return (
            <div>
                {tag}
            </div>
        );
    }
}

export default MainTag;