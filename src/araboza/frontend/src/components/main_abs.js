import React, {Component} from 'react';
import '../css/main_abs.css';

class MainAbs extends Component {
    render() {
        return (
            <div>
                <ul className='absUl'>
                    <li className='absLi'>
                        <div className='absText'>
                            <h2>방법1</h2>
                            <p>Araboza의 방법 1을 설명한다</p>
                        </div>
                    </li>
                    <li className='absLi'>
                        <div className='absText'>
                            <h2>방법2</h2>
                             <p>Araboza의 방법 2을 설명한다</p>
                        </div>
                    </li>
                    <li className='absLi'>
                        <div className='absText'>
                            <h2>방법3</h2>
                             <p>Araboza의 방법 3을 설명한다</p>
                        </div>
                    </li>
                    <li className='absLi'>
                        <div className='absText'>
                            <h2>방법4</h2>
                             <p>Araboza의 방법 4을 설명한다</p>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MainAbs;