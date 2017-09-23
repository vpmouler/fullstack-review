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
      username: null,
      top: null
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
      data: JSON.stringify({username:term}),
      success: (data) => {
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

  componentDidMount() {
    $.ajax({
      url:'/repos',
      type: 'GET',
      success: (data) => {
        console.log('success on GET', JSON.parse(data))
        this.setState({
          top: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('error!', err)
      }
    })
    // fetch('/repos').then(data=> {return data.json()}).then((data) => {
    //   console.log(data)
    //   this.setState({
    //     top: data
    //   })
    // })
  }

  render () {
    if ( this.state.repos.length ) {
      console.log('in if');
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search.bind(this)}/>
          <h1 style={{'border':'5px solid pink'}}> {this.state.username} </h1>
          <RenderRepos userRepos={this.state.repos}/>
        </div>
      )
    } 

    if ( this.state.top ) {
      console.log('there are stars!!!')
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search.bind(this)}/>
          <h1 style={{'border':'5px solid pink'}}> TOP REPOS! </h1>
          <RenderRepos userRepos={this.state.top}/>
        </div>
      )
    }

    else {
      console.log('in else');
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search.bind(this)}/>
        </div>
      )
    }
  }
};


// put in different file and import
const RenderRepos = (props) => (
  <div>
    <ul>
      {props.userRepos.map(function(repo, index) {
        return (
          <li key={index}>
             <a href={repo.url}>{repo.repo}</a>
             <a>: {repo.description}</a>
          </li>
          )
      })}
    </ul>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'));














