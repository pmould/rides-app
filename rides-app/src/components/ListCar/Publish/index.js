import React from 'react';
import {Redirect} from 'react-router-dom';
import {DefaultButton, AccountContent, AccountButtons, LargeButton, ListingPage, NavigationButtons,
  SectionCard, SectionTitle,  VehiclePublish, CheckBox, Options} from './styled-components';

class Publish extends React.Component {
  publishListingHandler = () => {
    const {actions, listing: {id: listingId}} = this.props;
    actions.publishListing(listingId);
  }

  updateWebPushNotification = (event) => {
    const {actions} = this.props;

    if(event.target.checked) {
      actions.turnOnWebNotifications();
    }
    else {
      actions.turnOffWebNotifications();
    }
  }
  
  render() {
    const {navigateBack, listing: {published}, pushNotifications, newListingView} = this.props; 

    const {webPushNoitificationViewable} = newListingView;
  
    const showWebPushNotification = webPushNoitificationViewable || !pushNotifications.isActive;
    if (published) {
      return <Redirect to='elegibility'/>
    }

    const content = (
      <SectionCard title='Publish Listing'>
        <SectionTitle>Publish your ride and start making money</SectionTitle>
        <VehiclePublish>
        <AccountContent>
          {<div>
            {showWebPushNotification
              && (
              <Options>
                Enable desktop &amp; mobile notifications for your listings
                <CheckBox defaultChecked
                  onChange={this.updateWebPushNotification}
                  checked={pushNotifications.isActive}/>
              </Options>
              )}
          </div>}
          <AccountButtons>
            <LargeButton ghost type='primary'
              onClick={this.publishListingHandler}>
              Publish
            </LargeButton>
          </AccountButtons>
          </AccountContent>
        </VehiclePublish>
        <NavigationButtons>
        <DefaultButton
          onClick={navigateBack}
        >
          Back
        </DefaultButton>
        </NavigationButtons>
      </SectionCard>
    );

    return (
      <ListingPage>
        {content}
      </ListingPage>
    );
  }
}

export default Publish;