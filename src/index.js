import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';

import Search from './component/List';
import List from './component/Search';
import Item from './component/Item';

class App extends Component {
    render() {
        return <div>
        {
            // 为什么list和search的组件顺序要反过来放
        }
        <Search />
        <List />
        </div>
    }
}

const routes = <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
        <Route path='/item/:id' component={Item}></Route>
    </Router>

ReactDOM.render(routes, document.getElementById('app'));

