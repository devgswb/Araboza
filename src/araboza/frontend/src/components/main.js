import React, {Component} from 'react';
import MainSide from './main_side';
import'../css/main.css';
import MainAbs from "./main_abs";
import MainSection from "./main_section";
import MainHeader from "./main_header";
import MainArticle from "./main_article";
import MainTag from "./main_tag";

class main extends Component {
    render() {
        return (
            <div className='_main'>
                <div className = '_container'>
                    <div className= '_mainDiv1'>
                        <div className = '_tag'>
                            <MainTag />
                        </div>
                        <div className = '_header' id='header'>
                            <MainHeader/>
                        </div>
                        <div className='_nav'>
                            <h2>딥러닝을 이용한 화제도 분석</h2>
                            <div>Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra </div>
                            <div>elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada. Praesent in sem ex. Morbi mattis sapien pretium tellus </div>
                            <div>venenatis, at egestas urna ornare.</div>
                        </div>
                        <div className = '_side'>
                            <MainSide/>
                        </div>
                        <div className = '_section'>
                            <MainSection/>
                        </div>
                    </div>

                    <div className= '_mainDiv2'>
                        <div className='_abs' id='abs'>
                            <MainAbs/>
                        </div>
                        <div className = '_article' id='article'>
                            <MainArticle/>
                        </div>

                        <div className = '_footer'>footer</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default main;