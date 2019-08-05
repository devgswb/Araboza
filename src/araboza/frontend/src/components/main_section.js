import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import '../css/main_section.css';
import axios from 'axios'

class MainSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list : []
        };
    }

    componentDidMount() {
        this._getList();
    }

    _getList() {
        const apiUrl = '/main/main_topic.json';

        axios.get(apiUrl).then(data => {
            this.setState ({
                list : data.data.list
            });
        }).catch (error => {
            console.log(error);
        })
    }

    state = {
        modal6: false,
        modal7: false
    };

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
                                    {this.state.list.map ((list,index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.mainNum}</TableCell>
                                            <TableCell align='right'>{list.mainTitle}</TableCell>
                                            <TableCell align='right'>{list.mainUpDown}</TableCell>
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