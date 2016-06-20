import React, {Component} from 'react';
import {Link} from 'react-router';

export default class List extends Component {
    // 获取api数据
    fetchList(q) {
        let url = `https://api.douban.com/v2/movie/search?q=${q}`;
        fetch(url).then((res)=>res.json()).then(res => {
            console.log(res);
        })
    }
    componentDidMount() {
        this.fetchList('姜文');
    }
    render() {
        return <div className='list'>
                <ul>
                    <li>
                        <Link to={{
                            pathname: `/item/88`
                        }} >跳到详细页</Link>
                    </li>
                </ul>
            </div>
    }
}