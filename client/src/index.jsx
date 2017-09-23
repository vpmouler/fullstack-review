import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// import fetch from 'isomorphic-fetch';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      username: null
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // fetch('127.0.0.1:1128', {method:'POST'})//(err, data) => {if (err) throw 'COULD NOT FETCH ME SUM DINNA'}).catch(err => console.log(err));
    // make a post request to server
    // redirect to page with results/append to body somehwere
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json',
      // crossDomain: true,
      data: JSON.stringify({username:term}),
      success: (data) => {
        console.log('success', JSON.parse(data));
        var userRepos = JSON.parse(data);
        this.setState({
          repos: userRepos,
          username: term
        });
        // this.renderRepos(userRepos)
        // use jquery to append to body, or make emthod/stateless react comp
      },
      error: (err) => {
        console.log('error', err)
      }

    })
  }

  componentWillMount() {
    fetch('/repos').then(data=> {return data.json()}).then(data => console.log('real',data))
  }

  renderRepos (userInfo) {
    userInfo.forEach((repo) => {
      return (<span>{repo.repoName}</span>)
    })
  }

  render () {
    if ( this.state.repos.length ) {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search.bind(this)}/>
          <h1 style={{'border':'5px solid pink'}}> {this.state.username} </h1>
          <RenderRepos userRepos={this.state.repos}/>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search.bind(this)}/>
        </div>
      )
    }
  }
}

const RenderRepos = (props) => (
  <div>
    <ul>
      {props.userRepos.map(function(repo, index) {
        return <li key={index}> {repo.name}: {repo.description} </li>
      })}
    </ul>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'));














