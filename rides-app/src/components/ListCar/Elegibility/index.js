import React from 'react';

import '../listing.css';

import {Select, ListingElegibilityPage, NavigationButtons, PrimaryButton, GHCodeTitle, SelectItem, LocationPlaceholder,
  GhPostCode, Region, District, SectionItems, StyledInputMask, SelectTitle, VehicleSelect, VehicleSelectCard} from './styled-components';

import {TransmissionOptions} from '../../../constants/Enums';

import regionDistrictsMap from '../../../constants/regionDistrictsMap';

import LocationSearchControl from '../../../containers/LocationSearchControl/Listing';
import MobileListings from '../../../containers/LocationSearchControl/MobileListings';

class Elegibility extends React.Component {
  state = {};

  getLocationCascaderValue = () => {
    const {listing = {}} = this.props;
    const {listingLocation = {}} = listing;
    const {ghCityId, ghCityAreaId, ghCityArea = {}, ghPostCodeRegionId, ghRegionAreaId, ghRegionArea = {}, popular: popularListingLocation = false} = listingLocation || {};


    if (ghCityId && ghCityAreaId) {
      const {popular} = ghCityArea;

      return ['popularCities', ghCityId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghCityAreaId];
    }
    else if(ghPostCodeRegionId && ghRegionAreaId) {
      const {popular} = ghRegionArea;

      return ['regions', ghPostCodeRegionId, (popular || popularListingLocation) ? 'popularAreas' : 'otherAreas', ghRegionAreaId];
    }
  }

  onChangeGhPostCode = (value) => {
    const ghPostCode = value.replace(/[_\-b]/g, '').toUpperCase().trim();
    const {actions} = this.props;
    actions.setGhPostCode(value);

    const regionCode = ghPostCode.length && ghPostCode[0];
    const districtCode = ghPostCode.length > 1 && ghPostCode[1];

    const regionMap = regionDistrictsMap[regionCode];

    const region = regionMap && regionMap.region;
    const district = regionMap && regionMap.districts[districtCode];

    this.setState({region, district});
  }

  openGhPostCodeExplorePage(e) {
    const  strWindowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes';
    
    window.open('https://www.ghanapostgps.com/mapview.html', 'CNN_WindowName', strWindowFeatures);
  }

  isListingLocationValid = (listingLocation) => {
    const {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId} = listingLocation || {};
    return (ghCityId && ghCityAreaId) || (ghPostCodeRegionId && ghRegionAreaId);
  }

  goToCustomSettings = (listing) => {
    const {actions} = this.props;
    const {} = listing;

    const {vehicle = {}, address = {}, listingLocation} = listing;
    const {ghPostCode= ''} = address;
    const {
      modelYear,
      makeId,
      modelId,
      vehicleTypeId,
      manual,
      odometerReadingEstimate,
      marketValueEstimate
    } = vehicle;

    const errors = [];
    if (!this.isListingLocationValid(listingLocation)) {
      errors.push('Vehicle Location not set')
    }
    if (!modelYear) {
      errors.push('Vehicle Year not set')
    }
    if (!makeId) {
      errors.push('Vehicle Make not set');
    }
    if (manual === undefined) {
      errors.push('Vehicle Transmission type not set');
    }
    if (!vehicleTypeId) {
      errors.push('Vehicle Type not set');
    }
    if (!odometerReadingEstimate) {
      errors.push('Vehicle Odometer Reading not set');
    }
    if (!marketValueEstimate) {
      errors.push('Vehicle Market Value not set');
    } 

    if (errors.length > 0) {
      // Display Errors

    const errorMessage = errors.map((error, i) => <div key={i}>{error}</div>);
    const errorMessageReactNode = <div>{errorMessage}</div>;
      actions.setListingErrors(errorMessageReactNode);
    }
    else {
      actions.saveListingElegibility(listing);
    }
  }
  render() {
    const {metaData, actions, listing} = this.props;
    const {years, makes, models, vehicleTypes, odometerOptions, marketValues} = metaData; 
    const {vehicle = {}, address = {}, hasErrors, listingLocation, published} = listing;
    const {ghPostCode = ''} = address;

    const {region, district} = this.state;
    const Option = Select.Option;

    const {
      modelYear,
      makeId,
      modelId,
      vehicleTypeId,
      manual,
      odometerReadingEstimate,
      marketValueEstimate
    } = vehicle;

    const yearDropdown =  (
      <Select
        value={modelYear}
        invalid={hasErrors && !modelYear}
        disabled={(modelYear && (years.length === 0)) || published}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleYear(value)}
        >
        {years.map(year => (
          <Option key={year} value={year}>
            {year}
          </Option>
      ))}
      </Select>
    );
 
    const makeDropdown =  (
      <Select
        value={makeId}
        invalid={hasErrors && !makeId}
        disabled={!makeId && (makes.length === 0) || published}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleMake(value)}
      >
        {makes.map(make => (
          <Option key={make.id} value={make.id}>
            {make.make}
          </Option>
      ))}
      </Select>
    );
 
    const modelDropdown =  (
      <Select
       value={modelId}
       disabled={(!modelId && (models.length === 0)) || published}
       placeholder='Select'
       onChange={(value) => actions.setListingVehicleProp('modelId', value)}
      >
        {models.map(model => (
          <Option key={model.id} value={model.id}>
            {model.model}
          </Option>
      ))}
      </Select>
    );

    const transmissionsDropdown =  (
      <Select
        value={manual}
        disabled={published}
        invalid={hasErrors && manual === undefined}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleProp('manual', value)}
        >
        {TransmissionOptions.map(trans => (
          <Option key={trans.label} value={trans.value}>
            {trans.label}
          </Option>
      ))}
      </Select>
    );

    const vehicleTypeDropdown =  (
      <Select
        value={vehicleTypeId}
        invalid={hasErrors && !vehicleTypeId}
        disabled={(vehicleTypes.length === 0) || published}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleProp('vehicleTypeId', value)}
      >
        {vehicleTypes.map(type => (
          <Option key={type.value} value={type.value}>
            {type.label}
          </Option>
      ))}
      </Select>
    );

    const odometerOptionsDropdown =  (
      <Select
        value={odometerReadingEstimate}
        invalid={hasErrors && !odometerReadingEstimate}
        disabled={(odometerOptions.length === 0) || published}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleProp('odometerReadingEstimate', value)}
      >
        {odometerOptions.map(opt => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
      ))}
      </Select>
    );
    
    const marketValuesDropdown =  (
      <Select
        value={marketValueEstimate}
        invalid={hasErrors && !marketValueEstimate}
        disabled={(marketValues.length === 0) || published}
        placeholder='Select'
        onChange={(value) => actions.setListingVehicleProp('marketValueEstimate', value)}
      >
        {marketValues.map(odo => (
          <Option key={odo.value.amount} value={odo.value.amount}>
            {odo.label}
          </Option>
      ))}
      </Select>
    );

    const content = (
      <VehicleSelectCard title='List Vehicle'>
        <SelectTitle>Location</SelectTitle>
        <SectionItems>
          <MobileListings {...{...this.props}}
            value={this.getLocationCascaderValue()}
            onSelectionChange={actions.setListingLocation}
          />
          <LocationSearchControl
            value={this.getLocationCascaderValue()}
            invalid={hasErrors && !this.isListingLocationValid(listingLocation)}
            onSelectionChange={actions.setListingLocation}
          />
        </SectionItems>
        <SectionItems>
        <GHCodeTitle>Gh Post Code (Optional)</GHCodeTitle>
          <GhPostCode>
            <StyledInputMask
              placeholder='Gh Post Code'
              type='text'
              mask='** - *** - ****'
              className='ant-input'
              value={ghPostCode}
              onChange={(e) => this.onChangeGhPostCode(e.target.value)}/>
            <Region>{region || <LocationPlaceholder>Region</LocationPlaceholder>}</Region>
            <District>{district || <LocationPlaceholder>District</LocationPlaceholder>}</District>
          </GhPostCode>
        <GHCodeTitle>
          Get GH Post Code <a onClick={this.openGhPostCodeExplorePage}>here</a>
        </GHCodeTitle>
        </SectionItems>
        <SelectTitle>Car</SelectTitle>
        <VehicleSelect>
          <SelectItem>
            <div>Year</div>
            {yearDropdown}
          </SelectItem>
          <SelectItem>
            <div>Make</div>
            {makeDropdown}
          </SelectItem>
          <SelectItem>
            <div>Model</div>
            {modelDropdown}
          </SelectItem>
          <SelectItem>
            <div>Transmission</div>
            {transmissionsDropdown}
          </SelectItem>
        </VehicleSelect>
        <VehicleSelect>
          <SelectItem>
            <div>Vehicle Type</div>
            {vehicleTypeDropdown}
          </SelectItem>
          <SelectItem>
            <div>Odometer</div>
            {odometerOptionsDropdown}
          </SelectItem>
          <SelectItem>
            <div>Market Value</div>
            {marketValuesDropdown}
          </SelectItem>
        </VehicleSelect>
        <NavigationButtons>
        <PrimaryButton        
          onClick={() => this.goToCustomSettings(listing)}
          type="primary"
        >
          Next
        </PrimaryButton>
        </NavigationButtons>
      </VehicleSelectCard>
    );

    return (
      <ListingElegibilityPage>
        {content}
      </ListingElegibilityPage>
    );
  }
}

export default Elegibility;