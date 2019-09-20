import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import main from './components/main';
import result_main from './components/result_main';
import MainFeature from "./components/mainFeature";
import MainMethod from "./components/mainMethod";
import MainTag from "./components/main_tag";
import MainSection from "./components/main_section";
import MainCss from "./components/main_css";
import MainNav from "./components/main_nav";
import MainTitle from "./components/main_title";
import MainBackground from "./components/main_background";
import MainArticle from "./components/main_article";
import MainSubheader from "./components/main_subheader";
import MainAbs from "./components/main_abs";
import MainSliderShow from "./components/main_slidershow";

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
                    <Route path="/feature" component = {MainFeature}/>
                    <Route path="/method" component = {MainMethod}/>
                    <Route path="/css" component = {MainSliderShow} />
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
