import React, { Component } from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable,
    MDBTableBody, MDBTableHead} from 'mdbreact';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import '../css/main_section.css';
import axios from 'axios';

class MainSection extends Component {

    state = {
        posts : [],
        modal6: false,
        modal7: false
    };

    async componentDidMount() {
        try {
            const res = await fetch('/api/index/');
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <div  className ="section">
                <MDBContainer className="sectionbtn">
                    <MDBBtn outline color="info" onClick={this.toggle(8)}>Today Ranking</MDBBtn>
                    <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right">
                        <MDBModalHeader toggle={this.toggle(8)}>
                            <div className='section_title'>
                                <h2>Today Ranking</h2>
                            </div>
                        </MDBModalHeader>
                        <MDBModalBody className='sectionModel'>
                            <MDBTable>
                                <MDBTableHead>
                                    <TableRow>
                                        <TableCell className='articleCell'>순위</TableCell>
                                        <TableCell className='articleCell' align='right'>이달의 단어</TableCell>
                                        <TableCell className='articleCell' align='right'>변동사항</TableCell>
                                    </TableRow>
                                </MDBTableHead>
                                <MDBTableBody >
                                    {this.state.posts.map ((list,index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.rang}</TableCell>
                                            <TableCell align='right'>{list.word}</TableCell>
                                            <TableCell align='right'>{list.plus}</TableCell>
                                        </TableRow>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn outline color="secondary" onClick={this.toggle(8)}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

export default MainSection;