import React from 'react';

import '../listing.css';

import {DefaultButton, ListingPage, NavigationButtons, PrimaryButton, SelectItem, SelectItemCol, SelectTitle,
  SelectsWrapper, StyledInput, StyledTextArea, VehicleSelect, VehicleSelectCard} from './styled-components';

import {} from '../../../constants';

import {} from 'antd';

class CarDetails extends React.Component {  
  saveListingDetails = (listing) => {
    const {actions, nextStateId} = this.props;
    const {dailyRate, description, vehicleRegistration: {licensePlate} = {}} = listing;

    const errors = [];
    if (!licensePlate) {
      errors.push('License plate is not set');
    }
    if (!description) {
      errors.push('Description is not set');
    }
    if (!dailyRate) {
      errors.push('Daily Rate not set');
    }

    if (errors.length > 0) {
      // Display Errors

    const errorMessage = errors.map((error, i) => <div key={i}>{error}</div>);
    const errorMessageReactNode = <div>{errorMessage}</div>;
      actions.setListingErrors(errorMessageReactNode);
    }
    else {
      if (nextStateId) {
        actions.saveListingDetails({...listing, registerListingStateId: nextStateId});
      }
      else {
        actions.saveListingDetails(listing);
      }
    }
  }

  render() {
    const {actions, listing, navigateBack} = this.props;
    const {description = '', vehicleRegistration, dailyRate, hasErrors} = listing;

    const {licensePlate = ''} = vehicleRegistration || {};

    const content = (
      <VehicleSelectCard title='Car Details'>
        <SelectsWrapper>
          <SelectTitle>Licence Plate</SelectTitle>
          <VehicleSelect>
            <SelectItem>
              <StyledInput
                placeholder='License Plate'
                invalid={hasErrors && !licensePlate}
                value={licensePlate} onChange={(e) => actions.setListingVehicleRegistrationProp('licensePlate', e.target.value)}/>
            </SelectItem>
            <div>Your license plate information won’t be publicly visible</div>
          </VehicleSelect>
          <SelectTitle>Description</SelectTitle>
          <VehicleSelect>
            <SelectItemCol>
              <div>A detailed description will help you get more trips.</div>
              {<StyledTextArea
                defaultValue={description}
                invalid={hasErrors && !description}
                onChange={(e) => actions.setListingProp('description', e.target.value)}
                rows='10'
                placeholder='Describe the basics and unique features of your car'
              />}
            </SelectItemCol>
            <SelectTitle>Daily Rate</SelectTitle>
          <VehicleSelect>
            <SelectItem>
              <StyledInput
                addonBefore='GH₵'
                type='number'
                placeholder='Daily Price'
                invalid={hasErrors && !dailyRate}
                value={dailyRate} onChange={(e) => actions.setListingProp('dailyRate', e.target.value)}/>
            </SelectItem>
          </VehicleSelect>
          </VehicleSelect>
        </SelectsWrapper>
        <NavigationButtons>
          <DefaultButton
            onClick={navigateBack}
            type="primary"
          >
            Back
          </DefaultButton>
          <PrimaryButton
            onClick={() => this.saveListingDetails(listing)}
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

export default CarDetails;