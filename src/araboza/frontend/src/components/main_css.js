import React, {Component} from 'react';
import '../css/main_css.css';

class MainCss extends Component {
    render() {
        return (
            <div className='css'>
                <div className='cssView'>
                    <img src={require('../img/ArabozaGrid02.png')} className="cssImg01" alt=""/>
                    <img src={require('../img/ArabozaGrid02.png')} className="cssImg02" alt=""/>
                    <img src={require('../img/ArabozaGrid02.png')} className="cssImg03" alt=""/>
                    <img src={require('../img/ArabozaGrid02.png')} className="cssImg04" alt=""/>
                </div>
            </div>
        );
    }
}

export default MainCss;