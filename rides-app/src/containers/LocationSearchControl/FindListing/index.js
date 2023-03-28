import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MetaDataActions from '../../../actions/metaData';
import * as SearchListingsActions from '../../../actions/searchListings';

import qs from 'query-string';
import {withRouter} from 'react-router-dom';

import {LocationCascader, LeftLocationLabel, RightLocationLabel,
  SearchControl, SearchButton} from './styled-components';

import {PopularCitiesList, RegionsList} from '../../../constants';

class LocationSearchControl extends React.Component {
  state = {
    modalVisible: false,
    locationCascaderOptions: undefined
  }
  constructor() {
    super();
    this.searchInput = React.createRef();
  }
  componentDidMount() {
    const {ghLocationSearchTaxonomy, clearInitSearch, actions} = this.props;
    if (ghLocationSearchTaxonomy.regions) {
      this.setState({locationCascaderOptions: this.renderLocationCascaderOptions(ghLocationSearchTaxonomy)})
    }
    const cascader = this.searchInput.current;

    cascader.input.input.onkeyup = (e) => {
      this.setState({popUpIsVisible: !!e.target.value.length});
    }

    if (clearInitSearch) {
      actions.clearSearchListings();
       cascader.input.input.focus();
    }
  }

  onCascaderPopUpVisibleChange = () => {

  }
  componentWillReceiveProps(nextProps, nextState) {
    const {ghLocationSearchTaxonomy: prevGhLocationSearchTaxonomy,
    history: {location: {key: prevLocKey, pathname, state: locationState}}} = this.props; 
    const {ghLocationSearchTaxonomy, actions, history} = nextProps;
    const {location: {key: currLocKey}} = history;
    const ghTaxonamyUpdated = ghLocationSearchTaxonomy && (ghLocationSearchTaxonomy !== prevGhLocationSearchTaxonomy);
    if (ghTaxonamyUpdated) {
      this.setState({locationCascaderOptions: this.renderLocationCascaderOptions(ghLocationSearchTaxonomy)})
    }
    //  || (pathname.indexOf('searchListings') !== -1 && prevLocKey !== currLocKey)
    if (ghTaxonamyUpdated || locationState == 'fromSearchNavLink') {
      if (pathname.indexOf('searchListings') !== -1) {
        const initialSearchValue = this.getInitalLocationCascaderValue(nextProps);
        actions.setSearchListingLocation(initialSearchValue);
        history.replace(window.location.pathname + window.location.search);
      }
    }
  }

  listingLocationSet = (listingLocation) => {
    const {all, ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId} = listingLocation;
    return (all || ghCityId || ghCityAreaId || ghPostCodeRegionId || ghRegionAreaId);
  }
  getInitalLocationCascaderValue = (nextProps) => {
    const {searchListings = {}, history: {location: {search}}, ghLocationSearchTaxonomy} = nextProps;
    const query = qs.parse(search);
    const {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId} = query;

    const {listingLocation = {}} = searchListings;
    const {all, popular: popularListingLocation = false} = listingLocation || {};

    const {popularCities, regions} = ghLocationSearchTaxonomy;

    let ghCityArea = '';
    let ghRegionArea = '';

    if (ghCityAreaId) {
      const cityList = popularCities[ghCityId].list;
      ghCityArea = cityList.areas.concat(cityList.popularAreas)
        .find(x => x.value === Number(ghCityAreaId));
    }
    else if (ghRegionAreaId) {
      const regionList = regions[ghPostCodeRegionId].list;
      ghRegionArea = regionList.areas.concat(regionList.popularAreas)
        .find(x => x.value === Number(ghRegionAreaId));
    }

    
    if (!ghCityId && !ghPostCodeRegionId) {
      return ['all'];
    }
    // else if (allCityId) {
    //   return 
    // }
    else if (ghCityId && !ghCityAreaId) {
      return ['popularCities', Number(ghCityId), 'all'];
    }
    else if (ghPostCodeRegionId && !ghRegionAreaId) {
      return ['regions', Number(ghPostCodeRegionId), 'all'];
    }
    if (ghCityId && ghCityAreaId) {
      const {popular} = ghCityArea;

      return ['popularCities', Number(ghCityId), (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', Number(ghCityAreaId)];
    }
    else if(ghPostCodeRegionId && ghRegionAreaId) {
      const {popular} = ghRegionArea;

      return ['regions', Number(ghPostCodeRegionId), (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', Number(ghRegionAreaId)];
    }
  }

  filterLocationCascader = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }

  renderSearchResults = (inputValue, path) => {
    let resultType = '';
    return path
      .filter(option => option.type !== 'menuItem')
      .slice()
      .reverse()
      .map((option, index) => {
        let currentResultType = '';
        if (option.type === 'allOf') {
          currentResultType = 'allOf';
        }

        if (resultType === 'allOf') {
          return <div></div>;
        }

        const displaySeparator = index === 0 && option.type !== 'allOf' && option.type !== 'all';
        const searchResultPath =  (
          <div key={option.value}>
            {`${option.label}${displaySeparator ? ',' : ''}`}
            &nbsp;
          </div>
        );

        resultType = currentResultType;

        return searchResultPath;
      })


  }

  selectLocationChangeHandler = (values, selectedOptions) => {
    const {onSelectionChange} = this.props;

    onSelectionChange(values, selectedOptions);
  }

  createChildrenOptions(areaGroups, areaGroupEnum, type) {
    return ({
      value: areaGroupEnum.value,
      label: areaGroupEnum.label,
      children: [{
        value: 'all',
        type: 'allOf',
        label: `All of ${areaGroupEnum.label}`
      }, {
        value: 'popularAreas',
        label: 'Popular Areas',
        type: 'menuItem',
        children: areaGroups[areaGroupEnum.value].list.popularAreas
      }, {
        value: 'otherAreas',
        label: 'Other Areas',
        type: 'menuItem',
        children: areaGroups[areaGroupEnum.value].list.areas
      }]
    });
  }

  renderLocationCascaderOptions(ghLocationSearchTaxonomy) {

    const {popularCities, regions} = ghLocationSearchTaxonomy;

    return [{
      value: 'all',
      label: 'All of Ghana',
      type: 'all',
      },
      {
      value: 'popularCities',
      label: 'Popular Cities',
      type: 'menuItem',
      children: PopularCitiesList.map(city =>
        this.createChildrenOptions(popularCities, city, 'city'))
    },{
      value: 'regions',
      label: 'Regions',
      type: 'menuItem',
      children: RegionsList.map(region => 
        this.createChildrenOptions(regions, region, 'region'))
    }];
  }
  displayRender = (labels, selectedOptions) => labels.map((label, i) => {
    if (label === 'Popular Cities'
      || label === 'Regions'
      || label === 'Popular Areas'
      || label === 'Other Areas') {
      return undefined;
    } else if (i === 1) {
      return <LeftLocationLabel key={label}>{label}</LeftLocationLabel>;
    }

    return <RightLocationLabel key={label}>{label}</RightLocationLabel>;
  })

  getLocationCascaderValue = () => {
    const {searchListings = {}} = this.props;
    const {listingLocation = {}} = searchListings;
    const {all, allCityId, allRegionId, ghCityId, ghCityAreaId, ghCityArea = {}, ghPostCodeRegionId, ghRegionAreaId, ghRegionArea = {}, popular: popularListingLocation = false} = listingLocation || {};

    if (all) {
      return ['all'];
    }
    else if (allCityId) {
      return 
    }
    else if (ghCityId && !ghCityAreaId) {
      return ['popularCities', ghCityId, 'all'];
    }
    else if (ghPostCodeRegionId && !ghRegionAreaId) {
      return ['regions', ghPostCodeRegionId, 'all'];
    }
    if (ghCityId && ghCityAreaId) {
      const {popular} = ghCityArea;

      return ['popularCities', ghCityId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghCityAreaId];
    }
    else if(ghPostCodeRegionId && ghRegionAreaId) {
      const {popular} = ghRegionArea;

      return ['regions', ghPostCodeRegionId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghRegionAreaId];
    }
  }

  searchListing = () => {
    const {onSearch, actions, history, searchListings: {listingLocation: {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId}}} = this.props;

    const queryParam = qs.stringify({ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId});
    history.push(`/searchListings?${queryParam}`);
    actions.fetchSearchListings(ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId)
    typeof onSearch === 'function' && onSearch();
  }

  render() {
    const {actions, ghLocationSearchTaxonomy, inputSize, size, searchListings: {listingLocation = {}}, hideMenu, searchColor} = this.props;
    const {locationCascaderOptions, popUpIsVisible} = this.state;

    const locationCascaderValue = this.getLocationCascaderValue();

    const locationSet = this.listingLocationSet(listingLocation);
    const popUpProps = hideMenu ? {popupVisible: popUpIsVisible && !locationSet} : {};
    return (
      <SearchControl>
        <LocationCascader
          {...popUpProps}
          size={size}
          inputSize={inputSize}
          showAction={['focus']}
          onPopupVisibleChange={this.onCascaderPopUpVisibleChange}
          expandTrigger='hover'
          defaultValue={['all']}
          ref={this.searchInput}
          displayRender={this.displayRender}
          options={locationCascaderOptions}
          onChange={actions.setSearchListingLocation}
          showSearch={{
            filter: this.filterLocationCascader,
            render: this.renderSearchResults
            }}
          value={locationCascaderValue}
          placeholder='Enter an area in Ghana' />
          <SearchButton
            size={size}
            searchcolor={searchColor}
            disabled={!locationCascaderValue}
            onClick={this.searchListing}/>
      </SearchControl>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ghLocationSearchTaxonomy: state.metaData.ghLocationSearchTaxonomy,
    searchListings: state.searchListings
  };
}

const mapDispatchToActions = (dispatch, ownProps) => {
  const {actions} = ownProps;
  return {
    actions: {...actions, ...bindActionCreators({
      ...MetaDataActions,
      ...SearchListingsActions
    }, dispatch)}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(LocationSearchControl));