import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ListingActions from '../actions/listings';
import * as MetaDataActions from '../actions/metaData';
import * as CommonViewActions from '../actions/commonView';
import * as NotificationsActions from '../actions/notifications';

import ListCarComponent from '../components/ListCar';

import {withRouter} from 'react-router-dom';

class ListCar extends React.Component {
  constructor(props) {
    super(props);
    const {actions} = props;

    actions.fetchNewVehicleStaticData();
  }

  componentDidMount() {
    const {match} = this.props;
    const {params = {}} = match;
    const {listingId = ''} = params;

    const {actions} = this.props;

    actions.clearListing();
    Number.isInteger(Number(listingId)) && actions.fetchListingWithVehicleMetaData(listingId);
    window.document.querySelector('body').scrollTop = 0;
  }
  
  componentWillUnmount() {
    const {actions} = this.props;

    actions.clearListing();
  }

  componentDidUpdate(prevProps) {
    const {match: {params: {listingId: prevRouteListingId}}, listing: {id: prevListingId}} = prevProps;
    const {history, actions, match: {params: {listingId: routeListingId}}, listing: {id: listingId}} = this.props;

    if (routeListingId !== prevRouteListingId) {
      actions.clearListing();
      Number.isInteger(Number(routeListingId)) && actions.fetchListingWithVehicleMetaData(routeListingId);
    }

    if (prevListingId && !listingId) {
      // TODO: FIgure out better solution for putting this here if there is a valid reason
      // history.push('/host/vehicles');
    }
  }

  render() {
    return <ListCarComponent {...{...this.props}}/>
  }
}

const mapStateToProps = (state) => {
  return {
    listing: state.listing,
    metaData: state.metaData,
    newListingView: state.newListingView,
    pushNotifications: state.notifications.pushNotifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...ListingActions,
      ...MetaDataActions,
      ...CommonViewActions,
      ...NotificationsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCar));