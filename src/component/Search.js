import React, {Component} from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    search() {
        const {onSearch} = this.props;
        onSearch(this.refs.inputSearch.value);
    }
    render() {
        return <div>
                <input placeholder='找一下' ref='inputSearch' />
                {
                    // 为什么要用返回的方式，不然refs的值获取不了？
                }
                <button onClick={e => {
                    this.search(e)
                }}>搜索</button>
            </div>
    }
}