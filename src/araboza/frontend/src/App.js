import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import main from './components/main';
import result_main from './components/result_main';
import result_wordCloud from './components/result_wordCloud';
import main_rankingWordCloud from './components/main_section';


class App extends Component {
    state = {
        data: {
            positive: 0.0,
            negative: 0.0
        }
    };

    // loadData(){
    //     this.props.lodaData();
    //     this.setState({
    //         data:this.data
    //     })
    // }

    render() {
        return (
            <div className="App">
                <Router>
                    <Route exact path="/" component = {main}/>
                    <Route path="/result" component = {result_main} />
                    <Route path="/css" component = {main_rankingWordCloud} />
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
