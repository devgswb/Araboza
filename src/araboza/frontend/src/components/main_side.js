import React, {Component} from 'react';
import '../css/main_side.css'
import {MDBBtn, MDBCol, MDBInput, MDBIcon} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class MainSide extends Component {

    render() {
        return (
            <div className='side'>
                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" containerClass="mt-0" />
                </MDBCol>
                <MDBBtn outline color="primary">
                    <MDBIcon icon="search" /> Search
                </MDBBtn>
            </div>
        );
    }
}


export default MainSide;