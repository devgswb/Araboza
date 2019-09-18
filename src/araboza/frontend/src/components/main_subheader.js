import React, {Component} from 'react';
import '../css/main_subheader.css';

class MainSubheader extends Component {
    render() {
        return (
            <div className='sub'>
                <div className='subHeader'>
                    <span className='textTitle'>아 라 보 자</span>
                    <span className='textSub'>화제도 분석</span>
                </div>
            </div>
        );
    }
}

export default MainSubheader;