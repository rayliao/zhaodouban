import React, {Component} from 'react';

export default class Search extends Component {
    render() {
        return <form>
                <input placeholder='找一下' />
                <button>搜索</button>
            </form>
    }
}