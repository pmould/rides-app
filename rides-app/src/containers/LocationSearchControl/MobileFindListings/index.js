import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as SearchListingsActions from '../../../actions/searchListings';

import {PopularCitiesList, RegionsList} from '../../../constants';

import {Link, withRouter} from 'react-router-dom';

import {SearchModal, SearchWrapper, Search, SearchSelection, SearchSelectionAllItem, 
  SearchSelectionItem, SearchItems, SearchItem, CloseButton} from './styled-components';

import FindListing from '../FindListing';

const modalRoot = document.getElementById('modal-root');

class MobileFindListings extends React.Component {
  goToSearchListings = (pathname) => {
    const {actions, history} = this.props;
    actions.toggleSearchListingModal();
    history.push(pathname, 'fromSearchNavLink');
  }
  render() {
    const {actions, showSearchListingsModal} = this.props;

    if (!showSearchListingsModal) {
      return <div></div>;
    }
    return (
      <SearchModal>
          <SearchWrapper>
            <CloseButton onClick={actions.toggleSearchListingModal}/>
            <Search>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <FindListing onSearch={actions.toggleSearchListingModal} clearInitSearch hideMenu size='large'/>
              </div>
              <SearchSelection>
                <SearchSelectionAllItem>
                  <SearchItems>
                  <SearchItem onClick={() => this.goToSearchListings(`/searchListings`)}>
                    All of Ghana
                  </SearchItem>
                  </SearchItems>
                </SearchSelectionAllItem>
                <SearchSelectionItem>
                  <SearchItems>
                  <SearchItem>
                  </SearchItem>
                  </SearchItems>
                </SearchSelectionItem>
              </SearchSelection>
              <SearchSelection>
                <SearchSelectionItem>
                  Cities
                  <SearchItems>
                    {
                      PopularCitiesList.map(city => (
                        <SearchItem key={city.value}
                            onClick={() => this.goToSearchListings(`/searchListings?ghCityId=${city.value}`)}>
                          {city.label}
                        </SearchItem>
                      ))
                    }
                  </SearchItems>
                </SearchSelectionItem>
                <SearchSelectionItem>
                  Regions
                  <SearchItems>
                    {
                      RegionsList.map(region => (
                        <SearchItem key={region.value}
                          onClick={() => this.goToSearchListings(`/searchListings?ghPostCodeRegionId=${region.value}`)}>
                         {region.label}
                        </SearchItem>
                      ))
                    }
                  </SearchItems>
                </SearchSelectionItem>
              </SearchSelection>
            </Search>
          </SearchWrapper>
      </SearchModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSearchListingsModal: state.searchListings.showSearchListingsModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...SearchListingsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileFindListings));