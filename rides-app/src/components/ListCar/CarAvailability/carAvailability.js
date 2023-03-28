import React from 'react';

import '../listing.css';

import {ListingPage, MainContent, SelectItem, Title, VehicleSelect, VehicleSelectCard} from './styled-components';

import {} from '../../../api';

import {Select} from 'antd';

class Listing extends React.Component {
  state = {
    listing: {
      advanceTime: '',
      tripMinDuration: '',
      tripMaxDuration: ''
    }
  };

  render() {
    const {actions} = this.props;

    const Option = Select.Option;
  
    const advanceTimeValues = [
      '12 hours',
      '1 day',
      '2 days',
      '3 days',
      '1 week'
    ];
 
    const tripMinDurationValues = [
      'Any',
      '1 day',
      '2 days',
      '3 days',
      '5 days',
      '1 week',
      '2 weeks',
      '1 month'
    ];   

    const tripMaxDurationValues = [
      'Any',
      '3 days',
      '5 days',
      '1 week',
      '2 week',
      '1 month',
      '3 months'
    ];
  
    const advanceTimeDropdown =  (
      <Select
        placeholder='Select'
        style={{width: 150}}
        onChange={this.advanceTimeSelectHandler}
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
        onChange={this.tripMinDurationSelectHandler}
        >
        {tripMinDurationValues.map(duration => (
          <Option key={duration} value={duration}>
            {duration}
          </Option>
      ))}
      </Select>
    );

    const tripMaxDurationDropdown =  (
      <Select
        placeholder='Select'
        style={{width: 150}}
        onChange={this.tripMaxDurationSelectHandler}
        >
        {tripMaxDurationValues.map(duration => (
          <Option key={duration} value={duration}>
            {duration}
          </Option>
      ))}
      </Select>
    );
    const content = (
      <VehicleSelectCard>
        <VehicleSelect>
          <SelectItem>
            <div>Advance Notice</div>
            {advanceTimeDropdown}
          </SelectItem>
        </VehicleSelect>
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
      </VehicleSelectCard>
    );

    const title = <Title>Car Availability</Title>;
    return (
      <ListingPage>
        <MainContent>
          {title}
          {content}
        </MainContent>
      </ListingPage>
    );
  }
}

export default Listing;