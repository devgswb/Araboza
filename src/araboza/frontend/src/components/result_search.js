import React, {Component} from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBCol,
    MDBInput,
    MDBIcon,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBAlert
} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {withRouter} from 'react-router-dom';
import "../css/result_search.css";

class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                modal2: false,
                alert: false,
                st: false,
                color: false,
                siteTitle: ''
            },
            menuOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange = (e) => {
        let searchStr = e.target.value;
        this.setState({title: searchStr});
    };
    handleSubmit = (e) => {
        this.axiosCancelSource = axios.CancelToken.source();
        console.log('this.title ->', this.state.title);
        e.preventDefault();
        const check = this.handleCheck();
        if (!check) {
            console.log("fuck", this.state);
        } else {
            let datas = [];
            const siteName = ["보배드림", "클리앙", "82쿡", "개드립", "eToLAND", "가생이", "웃긴대학", "해연갤", "인스티즈", "MLBPARK", "네이트판", "루리웹", "더쿠넷", "오늘의 유머", "와이고수"];
            const MAX_COMPLETE_COUNTER = siteName.length;
            let complete_counter = 0;
            for (let count = 1; count < 16; count++) {
                axios.get(`/api/search/?word=${this.state.title}&sitecode=${count}`, {cancelToken: this.axiosCancelSource.token})
                    .then((res) => {
                        this.setState({siteTitle: siteName[count - 1]});
                        console.log("검색페이지");
                        console.log(res);
                        localStorage.setItem('title', res.data['title']);
                        if (res.data.Success === 0) {
                            datas.push(res.data);
                        }

                    }).catch(function (error) {
                    console.log(error);
                    console.log(this.state.st);
                    let modalNumber = 'modal' + 2;
                    if (this.state.st === true) {
                        this.setState({
                            st: false,
                            alert: true,
                            color: true
                        });
                    } else {
                        this.setState({
                            alert: true,
                            [modalNumber]: !this.state[modalNumber],
                            color: false
                        });
                    }
                }.bind(this))
                    .then(() => { // always (항상) 작동
                        complete_counter += 1;
                        console.log(`${complete_counter}, ${MAX_COMPLETE_COUNTER}`);
                        if (complete_counter === MAX_COMPLETE_COUNTER) {
                            if (datas.length !== 0) {
                                this.props.history.push({
                                    pathname: `/result`,
                                    // data: res.data
                                    data: datas,
                                    siteCode: datas[0].site_code
                                })
                            } else {


                                console.log(this.state.st);
                                let modalNumber = 'modal' + 2;
                                if (this.state.st === true) {
                                    this.setState({
                                        st: false,
                                        alert: true,
                                        color: true
                                    });
                                } else {
                                    this.setState({
                                        alert: true,
                                        [modalNumber]: !this.state[modalNumber],
                                        color: false
                                    });
                                }


                            }
                            ;
                        }

                        console.log(datas);
                    });
            }
        }
    };

    handleCheck = (e) => {
        const typeCheck = /^[가-힣]+$/;
        let searchStr = this.state.title;
        if (!typeCheck.test(searchStr)) {
            this.setState({textError: '형식 오류입니다.'});
            return false
        } else {
            console.log('success');
            return true
        }
    };
    handleCancel = nr => () => {
        console.log('요청 취소');
        this.axiosCancelSource.cancel('Axios unmounted.');
        let modalNumber = 'modal' + nr;
        this.setState({
            st: true,
            [modalNumber]: !this.state[modalNumber]
        });
    };

    toggle = nr => () => {
        const check = this.handleCheck();
        {
            if (check) {
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
        if (message === true) {
            if (stop === true) {
                Alert =
                    <MDBAlert color="dark" className='resultSideAlert'>
                        입력이 중지되었습니다. 다시 검색해 주세요!
                    </MDBAlert>
            } else if (stop === false) {
                Alert =
                    <MDBAlert color="danger" className='resultSideAlert'>
                        요청 자료가 부족합니다. 다른 단어를 검색해 주세요!
                    </MDBAlert>
            }
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div id="searchBar">
                    <MDBCol>
                        <MDBInput hint="Search" type="text" className="resultSearchInput" value={this.state.title}
                                  onChange={this.handleChange}/>
                    </MDBCol>
                    <div style={{color: "red"}}>{this.state.textError}</div>
                    <MDBBtn outline color="primary" className="resultSearchBtn" onClick={this.toggle(2)}
                            type="submit"><MDBIcon icon="search"/>
                    </MDBBtn>
                    <button className="mobileBtn" onClick={this.toggle(2)} type="submit"><MDBIcon icon="search"/>
                    </button>

                    {Alert}
                    <MDBModal className="resultModal" isOpen={this.state.modal2} toggle={this.toggle(2)}
                              backdrop={false}>
                        <MDBModalHeader toggle={this.toggle(2)}>{this.state.title}에 대해 아라보자</MDBModalHeader>
                        <MDBModalBody>
                            <div>{this.state.siteTitle} 관련된 결과를 긁어오는 중입니다. 잠시만 기다려 주세요</div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </MDBModalBody>
                        {/*<MDBModalFooter>*/}
                        {/*    <MDBBtn color="secondary" onClick={this.handleCancel(2)}>중지하기</MDBBtn>*/}
                        {/*</MDBModalFooter>*/}
                    </MDBModal>
                </div>
            </form>
        );
    }
}

export default withRouter(ResultSearch);