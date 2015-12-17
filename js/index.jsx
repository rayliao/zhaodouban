require.ensure(['react', 'react-dom', 'react-router'], function(require) {
	var React = require('react');
	var ReactDOM = require('react-dom');
	var reqwest = require('reqwest');

	var SearchForm = React.createClass({
		getInitialState: function() {
		    return {
		    	query: '',
		    	type: 'movie'
		    };
		},
		componentDidMount: function() {
			var self = this;
			$(document).click(function(e) {
				if(!(e.target == $(".input-group-btn")[0] )) {
					$(".dropdown-menu").slideUp("fast");
				}
			});
			$(".input-group-btn").on("click", function(e){
				e.stopPropagation();
				$(".dropdown-menu").slideToggle("fast");
			});
			$(".dropdown-menu a").on("click", function(){
				$(".dropdown-text").text($(this).text());
				self.changeType($(this).data("value"));
			});
		},
		changeType: function(value) {
			this.setState({
				type: value
			});
		},
		search: function(e) {
			e.keyCode === 13 && this.props.onSearch({query: this.state.query, type: this.state.type});
		},
		change: function(e) {
			this.setState({
				query: e.target.value
			});
		},
		render: function() {
			return (
				<div className="navbar-form navbar-right">
					<div className="input-group">
						<input type="text" className="form-control" onKeyDown={this.search} onChange={this.change} placeholder="找一下..." autoFocus />
						<div className="input-group-btn">
							<button className="btn btn-default dropdown-toggle" type="button">
								<span className="dropdown-text">电影</span><span className="caret"></span>
							</button>
							<ul className="dropdown-menu">
								<li><a data-value="book" href="#">图书</a></li>
								<li><a data-value="movie" href="#">电影</a></li>
								<li><a data-value="music" href="#">音乐</a></li>
							</ul>
						</div>
					</div>
				</div>
			);
		}
	});

	var MovieList = React.createClass({
		render: function() {
			var data = this.props.data;
			var movieNodes = '';
			if(data != undefined) {
				if(data.length > 0){
					movieNodes = data.map(function(movie, index) {
						return (
							<div key={index} className="col-sm-6 col-md-4">
								<div className="thumbnail">
									<img src={movie.images.medium} />
									<div className="caption">
										<h3>{movie.title}</h3>
									</div>
								</div>
							</div>
						);
					});
				} else {
					movieNodes = (<div className="alert alert-warning">啊，什么都没有找到</div>);
				}
			}
			return (
				<div className="row">
					{movieNodes}
				</div>
			);
		}
	});

	var MainBox = React.createClass({
		getInitialState: function() {
		    return {
		    	results: null,
		    	loading: false,
		    	error: null,
		    	query: '',
		    	type: 'movie'
		    };
		},
		getData: function(state) {
			reqwest({
				url: 'http://api.douban.com/v2/' + state.type + '/search?q=' + state.query,
        		type: 'jsonp'
			})
			.then(response => this.setState({ loading: false, results: response.subjects }))
			.fail(err => this.setState({ loading: false, error: 'error' }));
		},
		handleSearch: function(state){
			this.setState({loading: true});
			this.getData(state);
		},
		handleResult: function() {
			if(this.state.loading) {
				return (<div className="alert alert-info">请稍等，正在找哦</div>);
			} else if (this.state.results == null && this.state.error == null) {
				return (<div className="alert alert-info">嗨！可以在搜索框输入内容回车找哟</div>);
			} else if(this.state.error != null) {
				return (<div className="alert alert-danger">额，有点问题，要不你再试下？</div>);
			} else {
				return (<MovieList data={this.state.results} />);
			}
		},
		render: function() {
			return (
				<div>
					<nav className="navbar navbar-inverse navbar-fixed-top">
						<div className="container">
							<div className="navbar-header">
					          <a className="navbar-brand" href="/">找豆瓣</a>
					        </div>
					        <div className="navbar-collapse collapse">
					        	<SearchForm onSearch={this.handleSearch} />
					        </div>
						</div>
					</nav>
					<div className="main container">
						{this.handleResult()}
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(
		<MainBox />,
		document.getElementById('main')
	);
});