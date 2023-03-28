import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MetaDataActions from '../../actions/metaData';

import {LocationCascader, LeftLocationLabel, RightLocationLabel, ListingLocationControlWrapper} from './styled-components';

import {PopularCitiesList, RegionsList} from '../../constants';

class LocationSearchControl extends React.Component {
  state = {
    modalVisible: false,
    locationCascaderOptions: undefined
  }

  componentDidMount() {
    const {ghLocationSearchTaxonomy} = this.props;
    if (ghLocationSearchTaxonomy.popularCities) {
      this.setState({locationCascaderOptions: this.renderLocationCascaderOptions(ghLocationSearchTaxonomy)})
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {ghLocationSearchTaxonomy: prevGhLocationSearchTaxonomy} = this.props; 
    const {ghLocationSearchTaxonomy} = nextProps;
    if (ghLocationSearchTaxonomy && (ghLocationSearchTaxonomy !== prevGhLocationSearchTaxonomy)) {
      this.setState({locationCascaderOptions: this.renderLocationCascaderOptions(ghLocationSearchTaxonomy)})
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

  renderLocationCascaderOptions(ghLocationSearchTaxonomy) {

    const {popularCities, regions} = ghLocationSearchTaxonomy;

    return [{
      value: 'popularCities',
      label: 'Popular Cities',
      children: PopularCitiesList.map(city =>
        this.createChildrenOptions(popularCities, city))
    },{
      value: 'regions',
      label: 'Regions',
      children: RegionsList.map (region => 
        this.createChildrenOptions(regions, region))
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
o
  render() {
    const {value} = this.props;
    const {locationCascaderOptions} = this.state;

    return (
      <ListingLocationControlWrapper>
        <LocationCascader
          {...{...this.props}}
          displayRender={this.displayRender}
          options={locationCascaderOptions}
          onChange={this.selectLocationChangeHandler}
          showSearch={{filter: this.filterLocationCascader}}
          value={value}
          placeholder="Select an Area" />
      </ListingLocationControlWrapper>
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

export default connect(mapStateToProps, mapDispatchToActions)(LocationSearchControl);