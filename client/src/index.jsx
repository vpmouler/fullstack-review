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
      repos: []
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
        console.log('success', data)
      },
      error: (err) => {
        console.log('error', err)
      }

    })
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));