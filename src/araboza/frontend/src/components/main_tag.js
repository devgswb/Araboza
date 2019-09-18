import React, {Component} from 'react';
import {MDBNavbar, MDBContainer, MDBNavLink, MDBNavItem, MDBNavbarToggler, MDBNavbarBrand, MDBNavbarNav, MDBCollapse, MDBIcon} from "mdbreact";
import '../css/main_tag.css'
import {Link} from 'react-router-dom';

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

    render() {
        return (
            <div>
                    <header>
                        <MDBNavbar color="black" dark expand="md" scrolling fixed="top">
                            <MDBNavbarBrand href="/">
                                <h3>아 라 보 자</h3>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={ this.onClick } />
                            <MDBCollapse isOpen = { this.state.collapse } navbar>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBNavLink to= "/feature">Home</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/method">Features</MDBNavLink>
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
