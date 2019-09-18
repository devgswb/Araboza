import React, {Component} from 'react';
import MainSide from './main_side';
import'../css/main.css';
import MainHeader from "./main_header";
import MainTitle from "./main_title";
import MainCss from "./main_css";
import MainTag from "./main_tag";
import MainNav from "./main_nav";
import MainBackground from "./main_background";


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width : 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width : window.innerWidth
        });
    }

    state={
        modal2: false,
    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        let wWidth = this.state.width;

        return (
            <div className='_main'>
                <div className='_bg'>
                    <div className='_ground'><MainBackground/></div>
                </div>
                <div className='_bg2'>
                </div>
                <div className='_bg3'>
                </div>
                <div className='_mainContainer'>
                    <div className='_title'><MainTitle/></div>
                    <div className = '_header'><MainHeader/></div>
                    <div className='_nav'><MainNav/></div>
                    <div className='_css'><MainCss/></div>
                    <div className = '_side'><MainSide/></div>
                </div>
            </div>
        );
    }
}
export default main;