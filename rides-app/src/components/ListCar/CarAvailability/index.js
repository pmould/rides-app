import React from 'react';

import '../listing.css';

import {ListingPage, NavigationButtons, PrimaryButton, SelectItem, SelectTitle,
  SelectsWrapper, VehicleSelect, VehicleSelectCard} from './styled-components';

import {advanceTimeValues, tripMinDurationValues, tripMaxDurationValues} from '../../../constants';

import {Select} from 'antd';

class CarAvailability extends React.Component {
  saveListingAvailability = (listing) => {
    const {actions, routeState, listing: {registerListingState}, nextStateId} = this.props;

    if (nextStateId) {
      actions.saveListingAvailability({...listing, registerListingStateId: nextStateId});
    }
    else {
      actions.saveListingAvailability(listing);
    }
  }
  
  render() {
    const {actions, listing, navigateBack} = this.props;
    const {advanceTime, tripMinDuration, tripMaxDuration, hasErrors} = listing;
    const Option = Select.Option;
  
    const advanceTimeDropdown =  (
      <Select
        placeholder='Select'
        defaultValue={advanceTime}
        saveListingAvailability
        style={{width: 150}}
        onChange={value => actions.setListingProp('advanceTime', value)}
        >
        {advanceTimeValues.map(time => (
          <Option key={time} value={time}>
            {time}
          </Option>
      ))}
      </Select>
    );
 
    const tripMinDurationDropdown =  (
      <Select
        placeholder='Select'
        style={{width: 150}}
        defaultValue={tripMinDuration}
        onChange={value => actions.setListingProp('tripMinDuration', value)}
        >
        {tripMinDurationValues.map(duration => (
          <Option key={duration} value={duration === 'Any' ? null : duration}>
            {duration}
          </Option>
      ))}
      </Select>
    );

    const tripMaxDurationDropdown =  (
      <Select
        placeholder='Select'
        defaultValue={tripMaxDuration}
        style={{width: 150}}
        onChange={value => actions.setListingProp('tripMaxDuration', value)}
        >
        {tripMaxDurationValues.map(duration => (
          <Option key={duration} value={duration === 'Any' ? null : duration}>
            {duration}
          </Option>
      ))}
      </Select>
    );
    const content = (
      <VehicleSelectCard title='Car Availability'>
        <SelectsWrapper>
          <SelectTitle>How much advance time do you need to confirm trip?</SelectTitle>
          <VehicleSelect>
            <SelectItem>
              <div>Advance Notice</div>
              {advanceTimeDropdown}
            </SelectItem>
            <div>Block trips that don't give you enough time</div>
          </VehicleSelect>
          <SelectTitle>How long would you like your trip to last?</SelectTitle>
          <VehicleSelect>
            <SelectItem>
              <div>Shortest Possible Trip</div>
              {tripMinDurationDropdown}
            </SelectItem>
          </VehicleSelect>
          <VehicleSelect>
            <SelectItem>
              <div>Longest Possible Trip</div>
              {tripMaxDurationDropdown}
            </SelectItem>
          </VehicleSelect>
        </SelectsWrapper>
        <NavigationButtons>
          <PrimaryButton
            onClick={navigateBack}
            type="primary"
          >
            Back
          </PrimaryButton>
          <PrimaryButton
            onClick={() => this.saveListingAvailability(listing)}
            type="primary"
          >
            Next
          </PrimaryButton>
        </NavigationButtons>
      </VehicleSelectCard>
    );

    return (
      <ListingPage>
        {content}
      </ListingPage>
    );
  }
}

export default CarAvailability;