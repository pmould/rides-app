import React from 'react';

import {coverPhotoPlaceHolder} from '../../constants';

import {getVehicleDescription} from '../../utils';

import {Skeleton} from 'antd';

import {ListingItem, ListingPage, ListingCoverPhoto, ListingCoverPhotoWrapper, ListingCoverPhotoResponsiveWrapper,
  PageTitle, MainSection, MainContent, NavLink, VehicleInfo, VehiclesList} from './styled-components';

import MobileTitleHeader from '../../components/MobileTitleHeader';

class Listings extends React.Component {
  renderListingDetails = (listing) => {
    const {history} = this.props;
    const {id: listingId, vehicle = {}, photos = {}, published} = listing;

    const coverPhotoIndex = Object.keys(photos)[0];
    const coverPhotoUrl = (Number.isInteger(+coverPhotoIndex) && photos[coverPhotoIndex].photo) || coverPhotoPlaceHolder  

    return (
      <ListingItem>
        <ListingCoverPhotoWrapper onClick={() => history.push(`/list-your-car/${listingId}/elegibility`)}>
          <ListingCoverPhotoResponsiveWrapper>
            <ListingCoverPhoto src={coverPhotoUrl}/>
          </ListingCoverPhotoResponsiveWrapper>
        </ListingCoverPhotoWrapper>
        <VehicleInfo>
          <div>
            {getVehicleDescription(vehicle)}
          </div>
          <div>
            <NavLink to={`/list-your-car/${listingId}/elegibility`}>{`${published ? 'Edit Listing': 'Finish Listing'}`}</NavLink>
          </div>
          <div>
            Status: {`${published ? 'Listed': 'Finish Listing'}`}
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

  renderVehicleList = (items, hasListing) => (
    <VehiclesList>
      {!hasListing && 'No Vehicles'}
      {[...items.values()]
        .filter(listing => listing.id)
        .map(listing => this.renderListingDetails(listing))
      }
    </VehiclesList>
  )

  render() {
    const {listings, user} = this.props;
    const {items, loading} = listings;
    const hasListing = items && items.size;

    const isLoading = loading || !user.id;

    return (
      <ListingPage>
        <MainContent>
        <MobileTitleHeader
          title='Vehicles'
          secondaryTitle={!isLoading && `(${hasListing || 0})`}/>
          <MainSection>
          {isLoading
          ? this.renderVehicleSkeleton()
          : this.renderVehicleList(items, hasListing)}
          </MainSection>
        </MainContent>
      </ListingPage>
    );
  }
}

export default Listings;