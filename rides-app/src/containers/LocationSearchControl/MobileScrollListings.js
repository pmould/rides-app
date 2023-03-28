import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MetaDataActions from '../../actions/metaData';

import {LocationCascader, LeftLocationLabel, RightLocationLabel} from './styled-components';

import {PopularCitiesList, RegionsList} from '../../constants';

import Cascader from 'rmc-cascader';
import PopupCascader from 'rmc-cascader/lib/Popup';

class MobileScrollListings extends React.Component {
  state = {
    modalVisible: false,
    locationCascaderMajorAreaOptions: undefined,
    locationCascaderAreaOptions: undefined
  }

  componentDidMount() {
    const {ghLocationSearchTaxonomy} = this.props;
    if (ghLocationSearchTaxonomy.popularCities) {
      this.setState({locationCascaderMajorAreaOptions: this.renderLocationCascaderMajorOptions(ghLocationSearchTaxonomy)})
    }
  }

  componentDidUpdate(prevProps) {
    const {ghLocationSearchTaxonomy: prevGhLocationSearchTaxonomy} = prevProps; 
    const {ghLocationSearchTaxonomy} = this.props;
    if (ghLocationSearchTaxonomy && (ghLocationSearchTaxonomy !== prevGhLocationSearchTaxonomy)) {
      this.setState({locationCascaderMajorAreaOptions: this.renderLocationCascaderMajorOptions(ghLocationSearchTaxonomy)})
    }

    if (ghLocationSearchTaxonomy && (ghLocationSearchTaxonomy !== prevGhLocationSearchTaxonomy)) {
      this.setState({locationCascaderMajorAreaOptions: this.renderLocationCascaderMajorAreaOptions(ghLocationSearchTaxonomy)})
    }
  }

  filterLocationCascader = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }

  selectLocationChangeHandler = (values, selectedOptions) => {
    const {onSelectionChange} = this.props;

    onSelectionChange(values, selectedOptions);
  }

  createChildrenOptions(areaGroups, areaGroupEnum) {
    return ({
      value: areaGroupEnum.value,
      label: areaGroupEnum.label,
      children: [{
        value: 'popularAreas',
        label: 'Popular Areas',
        children: areaGroups[areaGroupEnum.value].list.popularAreas
      }, {
        value: 'otherAreas',
        label: 'Other Areas',
        children: areaGroups[areaGroupEnum.value].list.areas
      }]
    });
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


  renderLocationCascaderMajorOptions(ghLocationSearchTaxonomy) {

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

  renderLocationCascaderMajorAreaOptions(ghLocationSearchTaxonomy) {
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

  displayRender = (labels, selectedOptions) => labels.map((label, i) => {
    if (label === 'Popular Areas' || label === 'Other Areas') {
      return undefined;
    } else if (i !== 1) {
      return <LeftLocationLabel key={label}>{label}</LeftLocationLabel>;
    }

    return <RightLocationLabel key={label}>{label}</RightLocationLabel>;
  })
o
  onScrollChange = (value) => {
    console.log('onScrollChange', value);
  }


  render() {
    const {value} = this.props;
    console.log('value', value)
    const {locationCascaderMajorAreaOptions} = this.state;
    console.log('this.getLocationCascaderValue()', this.getLocationCascaderValue());

    const cascader = (
      <Cascader
        rootNativeProps={{ 'data-xx': 'yy' }}
        onChange={this.selectLocationChangeHandler}
        data={this.getLocationCascaderValue()}
        cols={3}
        onScrollChange={this.onScrollChange}
      />
    );

    return (
      <div>
        <LocationCascader
          displayRender={this.displayRender}
          options={locationCascaderMajorAreaOptions}
          onChange={this.selectLocationChangeHandler}
          showSearch={{filter: this.filterLocationCascader}}
          value={this.getLocationCascaderValue()}
          placeholder="Select an Area" />
      <PopupCascader
        cascader={cascader}
        value={this.state.value}
        onDismiss={this.onDismiss}
        onChange={this.onChange}
        title="Cascader"
      >
        <button ref="button">open</button>
      </PopupCascader>
      </div>
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

export default connect(mapStateToProps, mapDispatchToActions)(MobileScrollListings);