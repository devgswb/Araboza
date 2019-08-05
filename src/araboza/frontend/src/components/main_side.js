import React, {Component} from 'react';
import '../css/main_side.css'
import {MDBBtn, MDBCol, MDBInput, MDBIcon} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {Link} from 'react-router-dom';

class MainSide extends Component {

    constructor(props) {
         super(props);

         this.state = {
             title : '',
        }
    }

    handleChange = (e)=>{
        let searchStr = e.target.value;
        this.setState({ title : searchStr });
    };

    render() {
        return (
            <div className='side'>
                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" containerClass="mt-0" value={this.state.title} onChange={this.handleChange} />
                </MDBCol>
                <MDBBtn outline color="primary" >
                    <Link to= {`/result/${this.state.title}`}> <MDBIcon icon="search" /> Search </Link>
                </MDBBtn>
            </div>
        );
    }
}


export default MainSide;