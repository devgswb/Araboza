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
                 oneDayData : [],
                 oneCount: [],
                 twoDayData : [],
                 total: []
             }

        };
         axios.get(`/api/hotword/?day=0`)
            .then((res) => {
                console.log("검색페이지");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    oneDayData : res.data.result
                });
                console.log(this.state. oneDayData);
            }).catch(function (error) {
                console.log(error);
            });

         axios.get(`/api/hotword/?day=1`)
            .then((res) => {
                console.log("검색페이지");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                    twoDayData : res.data.result
                });
                console.log(this.state. twoDayData)
            }).catch(function (error) {
                console.log(error);
            });

         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleClick1 = this.handleClick1.bind(this);
    }

    handleClick1() {
    this.setState(state => ({
        day : '0',
    }));
        }

    handleSubmit = (e) => {
        console.log('this.title ->', this.state.day);
        e.preventDefault();
        axios.get(`/api/hotword/?day=${this.state.day}`)
            .then((res) => {
                console.log("검색페이지");
                localStorage.setItem('result', res.data['result']);
                this.setState({
                   oneDayData : res.data.result,
                    day : '1',
                });
                console.log(this.state.oneDayData)
            }).catch(function (error) {
                console.log(error);
            })
    };

        state = {
        modal6: false,
        modal7: false
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            day: '0'
        });
    };

    render() {
        let oneData = this.state.oneDayData;
        let twoData = this.state.twoDayData;
        let oneChange = [];
        let twoChange = [];
        let total = [];
        let upDown = [];
        let tbody;
        let now = this.state.day;
        function count() {
            if(now === '0'){
                for(let count=0; count < oneData.length; count++) {
                    oneChange.push(oneData[count].changes);
                }
                for(let count=0; count < twoData.length; count++) {
                    twoChange.push(twoData[count].changes);
                }
                for(let count=0; count < twoData.length; count++) {
                    if(oneChange[count] - twoChange[count] < 0) {
                        total.push(Math.abs(oneChange[count] - twoChange[count]));
                    }
                    else {
                        total.push(oneChange[count] - twoChange[count]);
                    }
                }
                condition();
                console.log(oneChange);
                console.log(twoChange);
                console.log(total);
            }
        }

        function condition() {
            for(let count=0; count < oneData.length; count++) {
                if(oneChange[count] > twoChange[count]) {
                    upDown.push(<MDBIcon icon="angle-double-up" />)
                }
                else if (oneChange[count] < twoChange[count]) {
                    upDown.push(<MDBIcon icon="angle-double-down" />)
                }
                else {
                    upDown.push(<MDBIcon icon="arrows-alt-h" />)
                }
            }
        }

        function pc() {
            if(now === '0'){
                tbody = oneData.map ((list,index) => (
                <TableRow key={index+1}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align='right'>{list.word}</TableCell>
                    <TableCell align='right'>{upDown[index]} ({total[index]})</TableCell>
                </TableRow>
                ));
            }
        }
        count();
        pc();
        return (
            <div  className ="section">
                <MDBContainer className="sectionbtn">
                    <form onSubmit={this.handleSubmit}>
                        <div className='sectionIcon'><MDBIcon icon="angle-double-right" onClick={this.toggle(8)} className='sectionTitle '/></div>
                    </form>
                    <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right" backdrop={false}>
                        <MDBModalHeader toggle={this.toggle(8)}>
                            <div className='section_title'>
                                <h2>Ranking Chart</h2>
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
