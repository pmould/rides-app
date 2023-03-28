import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SearchListingsActions from '../../actions/searchListings';
import * as MetaDataActions from '../../actions/metaData';
import * as CommonViewActions from '../../actions/commonView';

import SearchListings from '../../components/SearchListings';

import {withRouter} from 'react-router-dom';
import qs from 'query-string';

class Search extends React.Component {
  componentWillMount() {
    this.fetchSearchListingsFromQueryParams(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {history, location: {key: prevLocKey, pathname, state: locationState}} = nextProps;
    if (locationState === 'fromSearchNavLink') {
      this.fetchSearchListingsFromQueryParams(nextProps);
      history.replace(window.location.pathname + window.location.search);
    }
  }

  fetchSearchListingsFromQueryParams = (props) => {
    const {actions, history: {location: {search}}} = props;
    const query = qs.parse(search);
    const {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId} = query || {};
    actions.fetchSearchListings(ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId);
  }
  componentWillUnmount() {
    const {actions} = this.props;
    actions.clearSearchListings();
  }
  render() {
    return (
      <SearchListings {...{...this.props}}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ghLocationSearchTaxonomy: state.metaData.ghLocationSearchTaxonomy,
    searchListings: state.searchListings,
    user: state.metaData.user
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...SearchListingsActions,
      ...MetaDataActions,
      ...CommonViewActions
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(Search));