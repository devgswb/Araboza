import React, { Component } from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable,
    MDBTableBody, MDBTableHead, MDBIcon
} from 'mdbreact';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import '../css/main_section.css';
import axios from 'axios';

class MainSection extends Component {

        constructor(props) {
         super(props);

         this.state = {
             data : {
                 day : '',
                 resultData : [],
                 now : ''
             }

        };
         axios.get(`http://127.0.0.1:8000/api/hotword/?day=0`)
            .then((res) => {
                console.log("검색페이지");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    resultData : res.data.result
                });
                console.log(this.state.resultData)
            }).catch(function (error) {
                console.log(error);
            });

         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleClick1 = this.handleClick1.bind(this);
         this.handleClick2 = this.handleClick2.bind(this);
         this.handleClick3 = this.handleClick3.bind(this);
    }

    handleClick1() {
    this.setState(state => ({
        day : '0',
        now : '1'
    }));
        }

    handleClick2() {
    this.setState(state => ({
        day : '1',
        now : '2'
    }));
        }

    handleClick3() {
    this.setState(state => ({
        day : '2',
        now : '3'
    }));
        }


    handleSubmit = (e) => {
        console.log('this.title ->', this.state.day);
        e.preventDefault();
        axios.get(`http://127.0.0.1:8000/api/hotword/?day=${this.state.day}`)
            .then((res) => {
                console.log("검색페이지");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    resultData : res.data.result
                });
                console.log(this.state.resultData)
            }).catch(function (error) {
                console.log(error);
            })
    };

        state = {
        day : '0',
        posts : [],
        modal6: false,
        modal7: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            day : '0',
             now : '1'
        });
    };

    render() {
        const Day = this.state.day;
        let wWidth = window.matchMedia("screen and (max-width: 500px)");
        let moblieData = [];
        let pcData = this.state.resultData;
        let tbody;

        function condition() {
            if(wWidth.matches === true) {
                mobile();
            }
            else {
                pc();
            }
        }

        function mobile() {
            pcData.map ((list,index) => {
                if(index <5) {
                    moblieData.push(list);
                    }
                });
            tbody = moblieData.map ((mlist, index) => (
                    <TableRow key={index+1}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell align='right'>{mlist.word}</TableCell>
                        <TableCell align='right'>{mlist.changes}</TableCell>
                    </TableRow>
                ));
                console.log(moblieData);
        }

        function pc() {
            tbody = pcData.map ((list,index) => (
                <TableRow key={index+1}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align='right'>{list.word}</TableCell>
                    <TableCell align='right'>{list.changes}</TableCell>
                </TableRow>
            ));
        }

        if(Day === '0') {
            condition()
        }
        else if(Day === '1') {
            condition()
        }
        else if(Day === '2') {
            condition()
        }
        else {
            tbody = <div>일자를 클릭하세요</div>
        }
        return (
            <div  className ="section">
                <MDBContainer className="sectionbtn">
                    <form onSubmit={this.handleSubmit}>
                        <div className='viewIcon'><MDBIcon icon="chart-bar" onClick={this.toggle(8)} className='titleIcon'/></div>
                    </form>
                    <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right" backdrop={false}>
                        <MDBModalHeader toggle={this.toggle(8)}>
                            <div className='section_title'>
                                <h2>{this.state.now}일전 Ranking</h2>
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
                                     {tbody}
                                </MDBTableBody>
                            </MDBTable>
                            <form onSubmit={this.handleSubmit}>
                            <MDBBtn className='sectionBtn' outline color="primary" onClick={this.handleClick1} type='submit'>1일 전</MDBBtn>
                            <MDBBtn className='sectionBtn' outline color="primary" onClick={this.handleClick2} type='submit'>2일 전</MDBBtn>
                            <MDBBtn className='sectionBtn' outline color="primary" onClick={this.handleClick3} type='submit'>3일 전</MDBBtn>
                            </form>
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

/*<MDBBtn outline color="info" onClick={this.toggle(8)} type='submit'>Chart</MDBBtn>*/