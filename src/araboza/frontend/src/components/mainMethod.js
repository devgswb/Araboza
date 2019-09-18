import React, {Component} from 'react';
import MainTag from "./main_tag";
import MainAbs from "./main_abs";
import MainFooter from "./main_footer";
import '../css/mainMethod.css';
import MainSubheader from "./main_subheader";

class MainMethod extends Component {
    render() {
        return (
            <div className="mainMethod">
                <div className='methodTag'><MainTag/></div>
                <div className='methodAbs'><MainSubheader/></div>
                <div className='methodFooter'><MainAbs/></div>
            </div>
        );
    }
}

export default MainMethod;