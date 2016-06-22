import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import fetchJsonp from 'fetch-jsonp';

import List from './component/List';
import Search from './component/Search';
import Item from './component/Item';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
        // 都要绑定吗？
        this.fetchList = this.fetchList.bind(this);
    }
     // 获取api数据
    fetchList(q) {
        let url = `https://api.douban.com//v2/movie/search?q=${q}`;
        fetchJsonp(url).then(res => res.json()).then(res => {
            const list = res.subjects;
            this.setState({
                list
            })
        });
    }
    
    componentDidMount() {
        this.fetchList('姜文');
    }
    
    render() {
        return <div>
            <Search onSearch={this.fetchList} />
            <List list={this.state.list} />
        </div>
    }
}

const routes = <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
        <Route path='/item/:id' component={Item}></Route>
    </Router>

ReactDOM.render(routes, document.getElementById('app'));

