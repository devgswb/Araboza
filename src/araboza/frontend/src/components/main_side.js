import React, {Component} from 'react';
import '../css/main_side.css'
import {MDBBtn, MDBCol, MDBInput, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBAlert} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class MainSide extends Component {

    constructor(props) {
         super(props);

         this.state = {
             data : {
                 title : "",
                 modal2: false,
                 alert : false,
                 st : false,
                 color : false
             }
        };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange = (e)=>{
        let searchStr = e.target.value;
        this.setState({ title : searchStr });
    };

    handleSubmit = (e) => {
        this.axiosCancelSource = axios.CancelToken.source();
        console.log('this.title ->', this.state.title);
        e.preventDefault();
        const check = this.handleCheck();
        if (!check) {
            console.log("fuck", this.state);
        }
        else {
            axios.get(`/api/search/?word=${this.state.title}`,{cancelToken: this.axiosCancelSource.token})
            .then((res) => {
                console.log("검색페이지");
                console.log(res);
                localStorage.setItem('title', res.data['title']);
                // 사이트의 Success 가 0인 경우 성공한 것이므로
                // 0 일 때에만 데이터를 배열에 넣어서 result 로 넘김
                var datas = [];
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i].Success === 0) {
                        datas.push(res.data[i]);
                    }
                }
                this.props.history.push({
                    pathname: `/result`,
                    // data: res.data
                    data: datas,
                    siteCode : datas[0].site_code
                })
            }).catch(function (error) {
                console.log(error);
                console.log(this.state.st);
                let modalNumber = 'modal' + 2;
                if (this.state.st === true ) {
                    this.setState({
                        st : false,
                        alert : true,
                        color : true
                    });
                }
                else {
                    this.setState({
                        alert : true,
                        [modalNumber]: !this.state[modalNumber],
                        color : false
                    });
                }
            }.bind(this))
        }
    };

    handleCheck = (e)=>{
        const typeCheck = /^[가-힣]+$/;
        let searchStr = this.state.title;
        if(!typeCheck.test(searchStr)) {
             this.setState({ textError : '형식 오류입니다.' });
             return false
        }
        else {
            console.log('success');
            return true
        }
    };

    handleCancel  = nr => () => {
        console.log('요청 취소');
        this.axiosCancelSource.cancel('Axios unmounted.');
        let modalNumber = 'modal' + nr;
        this.setState({
            st : true,
            [modalNumber]: !this.state[modalNumber]
        });
    };

    toggle = nr => () => {
        const check = this.handleCheck(); {
            if(check) {
                let modalNumber = 'modal' + nr;
                this.setState({
                    [modalNumber]: !this.state[modalNumber]
                });
            }
        }
    };

    render() {
         const message = this.state.alert;
         const stop = this.state.color;
         let Alert;
         console.log(stop);
         if(message === true) {
             if (stop === true) {
                 Alert = <MDBAlert color="dark" className='sideAlert'>
                     입력이 중지되었습니다. (값을 입력해 주세요)
                 </MDBAlert>
             }
             else {
                 Alert = <MDBAlert color="danger" className='sideAlert'>
                     요청 자료가 부족합니다. (다른 값을 입력해 주세요)
                 </MDBAlert>
             }
         }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='side'>
                    <MDBCol md="6">
                        <MDBInput hint="Search" type="text" containerClass="mt-0" value={this.state.title} onChange={this.handleChange} />
                    </MDBCol>
                     <div style={{ color: "red"}}>{this.state.textError}</div>
                    <MDBBtn outline color="primary" onClick={this.toggle(2)} type="submit"><MDBIcon icon="search"/> Search
                    </MDBBtn>
                    {Alert}
                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                            <MDBModalHeader toggle={this.toggle(2)}>{this.state.title}을(를) 불러옵니다</MDBModalHeader>
                            <MDBModalBody>
                                <div>관련된 결과를 긁어오는 중입니다. 잠시만 기달려 주세요</div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.handleCancel(2)}>중지하기</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                </div>
            </form>
        );
    }
}


export default withRouter(MainSide)