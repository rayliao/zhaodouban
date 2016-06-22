import React, {Component} from 'react';
import {Link} from 'react-router';

export default class List extends Component {
    render() {
        
        const {list} = this.props;
        if (!list.length) {
            return <div>
                没找到有电影哦~
            </div>
        } else {
             return <div className='list'>
                <ul>
                    {
                        list.map((item) => {
                            return <li key={item.id}>
                                <img src={item.images.medium} />
                                <Link to={{
                                    pathname: `/item/${item.id}`
                                }}>{item.title}</Link>
                                <p>评分：{item.rating.average}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        }
    }
}