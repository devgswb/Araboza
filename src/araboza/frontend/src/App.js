import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import main from './components/main';
import result_main from './components/result_main';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadData } from "./saga/resultSaga";


class App extends Component {
    state = {
        data: {
            positive: 0.0,
            negative: 0.0
        }
    };

    async dataGetFromAPIServer() {
        try {
            // Backend (django 서버)의 api/res/impression의 json 데이터를 비동기 방식(await)로 받아오는 부분이다.
            // 이번 프로젝트의 데이터 전달 방식으로 핵심적인 로직이 될 것!
            const res = await fetch('http://127.0.0.1:8000/api/res/impression/', { mode: "cors" });
            const data = await res.json();
            this.setState({data: data[0]});
        } catch (e) {
            console.log(e);
        }
    }

    // loadData(){
    //     this.props.lodaData();
    //     this.setState({
    //         data:this.data
    //     })
    // }

    render() {
        return (
            <div className="App">
                <button
                    onClick={(e) => this.dataGetFromAPIServer()}>
                    REST API를 이용하여 데이터를 가져와보자
                </button>
                <br/>
                <span>
                    긍정:{this.state.data.positive} 부정:{this.state.data.negative}
                </span>
                <Router>
                    <Route exact path="/" component = {main}/>
                    <Route path="/result" component = {result_main} />
                </Router>
            </div>
        )
    };
}

// function mapStateToProps(state){
//     return{
//         data:state.resultReducer.data
//     }
// }
// function mapDispatchToProps(dispatch){
//     return{
//         loadData:bindActionCreators(loadData, dispatch)
//     }
// }
//
// App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;

// export default connect(
//     state =>({data: state.data})
// )(App);
