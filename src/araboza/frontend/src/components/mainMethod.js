import React, {Component} from 'react';
import MainTag from "./main_tag";
import MainAbs from "./main_abs";
import '../css/mainMethod.css';
import MainSliderShow from "./main_slidershow";

class MainMethod extends Component {
    render() {
        return (
            <div className="mainMethod">
                <div className='methodTag'><MainTag/></div>
                <div className='methodSliderShow'><MainSliderShow/></div>
                <div className='methodAbs'><MainAbs/></div>
            </div>
        );
    }
}

export default MainMethod;