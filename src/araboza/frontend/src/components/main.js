import React, {Component} from 'react';
import MainSide from './main_side';
import'../css/main.css';
import MainHeader from "./main_header";
import MainTitle from "./main_title";
import MainCss from "./main_css";
import MainNav from "./main_nav";
import MainBackground from "./main_background";
import MainFeature from "./mainFeature";
import MainMethod from "./mainMethod";
import { Element} from 'react-scroll'


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
        let cssDesign;
        if(wWidth >= 1150) {
            cssDesign = <div className='_css'><MainCss/></div>;
        }
        else {
        }

        return (
            <div className='_main'>
                <div className='_bg'>
                    <div className='_ground'><MainBackground/></div>
                </div>
                <div className='_bg2'>
                </div>
                <div className='_bg3'>
                </div>
                <div className='_mainPack'>
                    <div className='_mainContainer'>
                        <div className='_title'><MainTitle/></div>
                        <div className = '_header'><MainHeader/></div>
                        <div className='_nav'><MainNav/></div>
                        {cssDesign}
                        <div className = '_side'><MainSide/></div>
                    </div>
                    <Element name="feature" className = '_mainFeature'><MainFeature/></Element>
                    <Element name="method"  className = '_mainMethod'><MainMethod/></Element>
                </div>
            </div>
        );
    }
}
export default main;