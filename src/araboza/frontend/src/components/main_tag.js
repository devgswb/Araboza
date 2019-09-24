import React, {Component} from 'react';
import {MDBNavbar, MDBContainer, MDBNavLink, MDBNavItem, MDBNavbarToggler, MDBNavbarBrand, MDBNavbarNav, MDBCollapse, MDBIcon} from "mdbreact";
import '../css/main_tag.css'
import { Link, scroller, animateScroll as scroll } from "react-scroll";

class MainTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    render() {
        return (
            <div>
                    <header>
                        <MDBNavbar color="black" dark expand="md" scrolling fixed="top">
                            <MDBNavbarBrand>
                                <a onClick={this.scrollToTop}><h3>아 라 보 자</h3></a>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={ this.onClick } />
                            <MDBCollapse isOpen = { this.state.collapse } navbar>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <Link activeClass="active" to="method" spy={true} smooth={true} offset={50} duration={500}>method</Link>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Link activeClass="active" to="feature" spy={true} smooth={true} offset={50} duration={500}>Feature</Link>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </header>
            </div>
        );
    }
}

export default MainTag;
