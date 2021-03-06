import React, {Component} from 'react';
import {Carousel} from '3d-react-carousal';
import '../css/main_slidershow.css'

class MainSliderShow extends Component {
    render() {

        let slideView =
            [
                <img src={require('../img/arabozaMainPage.png')} className="cssImg01" alt=""/>,
                <img src={require('../img/arabozaLoadingPage.png')} className="cssImg01" alt=""/>,
                <img src={require('../img/arabozaResultPage.png')} className="cssImg01" alt=""/>,
            ];
        return (

            <div className='sliderBody'>
                <div className='sliderView'>
                    <Carousel slides={slideView}/>
                </div>
            </div>
        );
    }
}

export default MainSliderShow;