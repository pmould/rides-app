import React from 'react';

import {getVehicleDescription} from '../../utils';

import {Skeleton} from 'antd';

import {SubTitle, ListingItem, ListingPage, ListingCoverPhoto, ListingCoverPhotoWrapper, ListingCoverPhotoResponsiveWrapper,
  PageTitle, MainSection, MainContent, NavLink, VehicleInfo, VehiclesList} from './styled-components';

class Vehicles extends React.Component {
  renderListingDetails = (listing) => {
    const {history} = this.props;

    const {id: listingId, vehicle = {}, photos = [], published} = listing;
    const coverPhotoUrl = photos[0] && photos[0].photo;  
    console.log(photos)
    return (
      <ListingItem>
        <ListingCoverPhotoWrapper onClick={() => history.push(`/listing/${listing.id}`)}>
          <ListingCoverPhotoResponsiveWrapper>
            <ListingCoverPhoto src={coverPhotoUrl}/>
          </ListingCoverPhotoResponsiveWrapper>
        </ListingCoverPhotoWrapper>
        <VehicleInfo>
          <div>
            {getVehicleDescription(vehicle)}
          </div>
        </VehicleInfo>
      </ListingItem>
    );
  }

  renderVehicleSkeleton = () => (
    <VehiclesList>
      {[...Array(5).keys()].map(x => (
        <ListingItem key={x}>
          <Skeleton active/>
        </ListingItem>
      ))}
      </VehiclesList>
  )

  renderVehicleList = (listings) => (
    <VehiclesList>
      {!listings && 'No Vehicles'}
      {listings && listings
        .map(listing => this.renderListingDetails(listing))
      }
    </VehiclesList>
  )

  render() {
    const {listings} = this.props;
    console.log('listings', listings);

    return (
      <ListingPage>
        <MainContent>
        <div>
          <SubTitle>Vehicles {listings && `(${listings.length})`}</SubTitle>
        </div>
        <MainSection>
          {!listings
          ? this.renderVehicleSkeleton()
          : this.renderVehicleList(listings)}
        </MainSection>
        </MainContent>
      </ListingPage>
    );
  }
}

export default Vehicles;