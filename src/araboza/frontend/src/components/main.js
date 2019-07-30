import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <header>
                    <h1> ARABOZA </h1>
                </header>
                <div>
                    Araboza 메인 페이지입니다.
                </div>
                <div>
                    <Link to={'/result'} >검색</Link>
                </div>
            </div>
            /* result=? 값추가 예정 */
        );
    }
}

export default main;