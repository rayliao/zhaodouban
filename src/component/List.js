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
                                <Link to={{
                                    pathname: `/item/${item.id}`
                                }}>{item.title}</Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        }
    }
}