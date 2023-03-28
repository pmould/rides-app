import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MetaDataActions from '../../actions/metaData';

import {LocationCascader, LeftLocationLabel, RightLocationLabel} from './styled-components';

import {PopularCitiesList, RegionsList} from '../../constants';
import { PopularCitiesEnum, RegionsEnum } from '../../constants/Enums';

import styled from 'styled-components';
import {styledMedia} from '../../components/styled-components';

export const MobileListingWrapper = styled.div`
  ${styledMedia.greaterThan('tablet')`
    display: none;
  `}
`;

class LocationSearchControlMobile extends React.Component {
  state = {
    modalVisible: false,
    locationCascaderMajorAreaOptions: undefined,
    locationCascaderAreaOptions: undefined
  }

  componentDidMount() {
    const {ghLocationSearchTaxonomy, listingLocation: {ghCityAreaId, ghRegionAreaId} = {}} = this.props;
    if (ghLocationSearchTaxonomy.popularCities ) {
      this.setState({locationCascaderMajorAreaOptions: this.setLocationCascaderMajorOptions(ghLocationSearchTaxonomy)})
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {ghLocationSearchTaxonomy: prevGhLocationSearchTaxonomy,
      listing: {listingLocation: {ghCityId: prevGhCityId,ghPostCodeRegionId: prevGhPostCodeRegionId} ={}} = {}} = prevProps; 
    const {ghLocationSearchTaxonomy, listing:
      {listingLocation: {ghCityId, ghPostCodeRegionId, ghCityAreaId, ghRegionAreaId} = {}} = {}} = this.props;

    const locationDataUpdated = ghLocationSearchTaxonomy && (ghLocationSearchTaxonomy !== prevGhLocationSearchTaxonomy);
    const listingLocationUpdate = ghCityId !== prevGhCityId || ghPostCodeRegionId !== prevGhPostCodeRegionId;
    if (locationDataUpdated) {
      this.setState({locationCascaderMajorAreaOptions: this.setLocationCascaderMajorOptions(ghLocationSearchTaxonomy)})
    }

    if (listingLocationUpdate || (locationDataUpdated && (ghCityAreaId || ghRegionAreaId))) {
      this.setState({locationCascaderAreaOptions: this.setLocationCascaderMajorAreaOptions(ghLocationSearchTaxonomy)})
    }

    const {locationCascaderMajorAreaOptions: prevMajorAreaOptions} = prevState;
    const {locationCascaderMajorAreaOptions} = this.state;

    if (locationCascaderMajorAreaOptions !== prevMajorAreaOptions) {
       this.setState({locationCascaderAreaOptions: this.setLocationCascaderMajorAreaOptions(ghLocationSearchTaxonomy)})
    }
  }
  
  filterLocationCascader = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }

  selectLocationChangeHandler = (values, selectedOptions, type) => {
    const {onSelectionChange} = this.props;

    onSelectionChange(values, selectedOptions, type);
  }

  createChildrenOptions(areaGroups, areaGroupEnum) {
    return [{
        value: 'popularAreas',
        label: 'Popular Areas',
        children: areaGroups[areaGroupEnum.value].list.popularAreas
      }, {
        value: 'otherAreas',
        label: 'Other Areas',
        children: areaGroups[areaGroupEnum.value].list.areas
      }];
  }

  getLocationCascaderValue = () => {
    const {listing = {}} = this.props;
    const {listingLocation = {}} = listing;
    const {ghCityId, ghCityAreaId, ghCityArea = {}, ghPostCodeRegionId, ghRegionAreaId, ghRegionArea = {}, popular: popularListingLocation = false} = listingLocation || {};

    if (ghCityId) {
      const {popular} = ghCityArea;

      return ['popularCities', ghCityId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghCityAreaId];
    }
    else if(ghPostCodeRegionId) {
      const {popular} = ghRegionArea;

      return ['regions', ghPostCodeRegionId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghRegionAreaId];
    }
  }

  getLocationCascaderAreaValue = () => {
    const {listing = {}} = this.props;
    const {listingLocation = {}} = listing;
    const {ghCityId, ghCityAreaId, ghCityArea = {}, ghPostCodeRegionId, ghRegionAreaId, ghRegionArea = {}, popular: popularListingLocation = false} = listingLocation || {};

    if (ghCityId && ghCityAreaId) {
      const {popular} = ghCityArea;

      return [(popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghCityAreaId];
    }
    else if(ghPostCodeRegionId && ghRegionAreaId) {
      const {popular} = ghRegionArea;

      return [(popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghRegionAreaId];
    }
  }


  setLocationCascaderMajorOptions(ghLocationSearchTaxonomy) {
    const {popularCities, regions} = ghLocationSearchTaxonomy;

    return [{
      value: 'popularCities',
      label: 'Popular Cities',
      children: PopularCitiesList.map(({label, value}) => ({label, value}))
    }, {
      value: 'regions',
      label: 'Regions',
      children: RegionsList.map(({label, value}) => ({label, value}))
    }];
  }

  setLocationCascaderMajorAreaOptions(ghLocationSearchTaxonomy) {    
    const {listing: {listingLocation: {ghCityId, ghPostCodeRegionId} = {}} = {}} = this.props;
    const {popularCities, regions} = ghLocationSearchTaxonomy;


    if (ghCityId) {
      return this.createChildrenOptions(popularCities, PopularCitiesEnum[ghCityId]);
    }
    else if (ghPostCodeRegionId) {
      return this.createChildrenOptions(regions, RegionsEnum[ghPostCodeRegionId]);
    }
  }

  displayRender = (labels, selectedOptions) => labels.map((label, i) => {
    if (label === 'Popular Areas' || label === 'Other Areas') {
      return <LeftLocationLabel key={label}>Area</LeftLocationLabel>;
    } else if (label === 'Popular Cities' || label === 'Regions') {
      const newLabel = (label === 'Popular Cities') ? 'City' : 'Region'; 
      return <LeftLocationLabel key={newLabel}>{newLabel}</LeftLocationLabel>;
    }

    return <RightLocationLabel key={label}>{label}</RightLocationLabel>;
  })

  render() {
    const {listing: {listingLocation: {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId} = {}, hasErrors} = {}} = this.props;
    const {locationCascaderMajorAreaOptions, locationCascaderAreaOptions} = this.state;

    return (
      <MobileListingWrapper>
        <LocationCascader
          {...{...this.props}}
          displayRender={this.displayRender}
          options={locationCascaderMajorAreaOptions}
          onChange={this.selectLocationChangeHandler}
          showSearch={{filter: this.filterLocationCascader}}
          value={this.getLocationCascaderValue()}
          invalid={hasErrors && !(ghCityId || ghPostCodeRegionId)}
          placeholder='Select Major Area' />
        {(ghCityId || ghPostCodeRegionId) && <LocationCascader
          {...{...this.props}}
          displayRender={this.displayRender}
          options={locationCascaderAreaOptions}
          onChange={(selectedValues, selectedOptions) =>
            this.selectLocationChangeHandler(selectedValues, selectedOptions, 'subAreaChange')}
          showSearch={{filter: this.filterLocationCascader}}
          value={this.getLocationCascaderAreaValue()}
          invalid={hasErrors && !(ghCityAreaId || ghRegionAreaId)}
          placeholder='Select Sub Area' />}
      </MobileListingWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ghLocationSearchTaxonomy: state.metaData.ghLocationSearchTaxonomy
  };
}

const mapDispatchToActions = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...MetaDataActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(LocationSearchControlMobile);