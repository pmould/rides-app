import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ListingActions from '../../actions/listings';

import Listings from '../../components/Listings';

class ListingsContainer extends React.Component {
  componentWillMount() {
    const {actions} = this.props;

    actions.fetchHostListings();
  }

  render() {

    return (
      <Listings {...{...this.props}}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listings: state.listings,
    user: state.metaData.user
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(ListingsContainer);