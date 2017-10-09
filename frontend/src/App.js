import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './components/Header';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import SearchPanel from './components/SearchPanel';
import Table from './components/Table';
import TextContainer from './components/TextContainer';
import { providerHeader } from './constants';
import { getProviders } from './actions/actions';


import './App.css';

const containerStyle = {
  width: '100%',
}

class App extends Component {
  render() {
    const { isFetching, isEmpty, data } = this.props;
    const initialRender = (!isEmpty && data.length === 0) && !isFetching;
    const noResults = !initialRender && isEmpty && !isFetching;
    const displayTable = !isFetching && !initialRender && !noResults;
    return (
      <div className="App">
        <Header />
        <Grid container spacing={16} style={containerStyle}>
          <Grid item xs={12} lg={6} xl={4}>
            <SearchPanel onSearch={this.props.getProviders}/>
          </Grid>
          <Grid item xs={12} lg={6} xl={8} className="results">
          {
            isFetching && (<div className="message"><CircularProgress size={50} /></div>)
          }
          {
            initialRender &&  <TextContainer>Your search results will appear here.</TextContainer>
          }
          {
            noResults && <TextContainer>No providers match the search criteria. Please try again.</TextContainer>
          }
          {
            displayTable && <Table title='Providers' headers={providerHeader} data={data} />
          }
          </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ providers }) => {
  const { isFetching, data, isEmpty } = providers;
  return {
    isFetching,
    isEmpty,
    data,
  };
}

const mapDispatchToProps = {
  getProviders,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
