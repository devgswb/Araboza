import React, {Component} from 'react';
import '../css/main_side.css'
import {MDBBtn, MDBCol, MDBInput, MDBIcon} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom';
import axios from 'axios';

class MainSide extends Component {

    constructor(props) {
         super(props);

         this.state = {
             data : {
                 title : "",
             }

        };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e)=>{
        let searchStr = e.target.value;
        this.setState({ title : searchStr });
    };

    handleSubmit = (e) => {
        console.log('this.title ->', this.state.title);
        var search = this.state.title;
        e.preventDefault();
        axios.get(`http://127.0.0.1:8000/api/search/?word=${this.state.title}`)
            .then((res) => {
                console.log("검색페이지");
                console.log(res);
                localStorage.setItem('title', res.data['title']);
                console.log('hello index');
                this.props.history.push({
                    pathname: '/result',
                    data: res.data
                })
            }).catch(function (error) {
                console.log(error);
            })

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='side'>
                    <MDBCol md="6">
                        <MDBInput hint="Search" type="text" containerClass="mt-0" value={this.state.title} onChange={this.handleChange} />
                    </MDBCol>
                    <MDBBtn outline color="primary" type="submit">
                  <MDBIcon icon="search"/> Search
                    </MDBBtn>
                </div>
            </form>
        );
    }
}


export default withRouter(MainSide)