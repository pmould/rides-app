import React from 'react';

import {coverPhotoPlaceHolder} from '../../constants';
import {RegionsEnum, PopularCitiesEnum, ModalDialogs} from '../../constants/Enums';

import {Skeleton} from 'antd';

import {SearchControl, SearchButton, MainSection, ChangeLocationLink, ResultsSection, ResultsHeader,
FilterSideBar, PerDay, PriceLabel, DailyRate, DailyRateNumber, Currency, ListingItem, ListingPage,
ListingCoverPhoto, ListingCoverPhotoWrapper, ListingCoverPhotoResponsiveWrapper, NoResultsFound,
  MainContent, NavLink, VehicleInfo, VehiclesList, FilterSection} from './styled-components';
import LocationSearchControl from '../../containers/LocationSearchControl/FindListing';

import ModalDialog from '../ModalDialog';

import {withRouter} from 'react-router-dom';
import qs from 'query-string';
import { getVehicleDescription } from '../../utils';
import MobileTitleHeader from '../MobileTitleHeader';

class SearchListings extends React.Component {
  componentDidMount() {
    document.querySelector('body').scrollTop = 0;
    document.querySelector('html').scrollTop = 0;
  }

  getLocationCategory = () => {
    const {query: {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId}} = this.props;

    if (ghCityId) {
      return PopularCitiesEnum[ghCityId].label;
    }
    else if (ghPostCodeRegionId) {
      return RegionsEnum[ghPostCodeRegionId].label;
    }

    if (!ghCityId && !ghCityAreaId && !ghPostCodeRegionId && !ghRegionAreaId) {
      return 'All of Ghana';
    }
  }

  getLocationSubCategory = () => {
    const {query: {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId}, ghLocationSearchTaxonomy} = this.props;
    
    const {popularCities, regions} = ghLocationSearchTaxonomy;

    if (ghCityAreaId) {
      const cityList = popularCities[ghCityId].list;
      const cityArea = cityList.areas.concat(cityList.popularAreas)
        .find(x => x.value === Number(ghCityAreaId));
      return cityArea && cityArea.area;
    }
    else if (ghRegionAreaId) {
      const regionList = regions[ghPostCodeRegionId].list;

      const regionArea = regionList.areas.concat(regionList.popularAreas)
        .find(x => x.value === Number(ghRegionAreaId));
      return regionArea && regionArea.area;
    }
  }

  renderListingDetails = (listing) => {
    const {id: listingId, dailyRate, vehicle = {}, photos = {}} = listing;

    const coverPhotoIndex = Object.keys(photos)[0];
    const coverPhotoUrl = (Number.isInteger(+coverPhotoIndex) && photos[coverPhotoIndex].photo) || coverPhotoPlaceHolder  

    return (
      <NavLink to={`/listing/${listingId}`}>
        <ListingItem>
          <ListingCoverPhotoWrapper>
            <ListingCoverPhotoResponsiveWrapper>
                <ListingCoverPhoto src={coverPhotoUrl}/>
                <PriceLabel>
                  <DailyRate>
                    <Currency>GH₵</Currency>
                    <DailyRateNumber>{dailyRate}</DailyRateNumber>
                  </DailyRate>
                  <PerDay>per Day</PerDay>
                </PriceLabel>
            </ListingCoverPhotoResponsiveWrapper>
          </ListingCoverPhotoWrapper>
          <VehicleInfo>
            <div>
              {getVehicleDescription(vehicle)}
            </div>
          </VehicleInfo>
        </ListingItem>
      </NavLink>
    );
  }

  searchListing = () => {
    const {actions, history, searchListings: {listingLocation: {ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId}}} = this.props;

    const queryParam = qs.stringify({ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId});
    history.push(`/searchListings?${queryParam}`);
    actions.fetchSearchListings(ghCityId, ghCityAreaId, ghPostCodeRegionId, ghRegionAreaId)
  }
  
  render() {
    const {searchListings, actions, ghLocationSearchTaxonomy} = this.props;

    const {items, loading} = searchListings;
    const hasListing = items && items.size;
    const taxonomiesLoading = !ghLocationSearchTaxonomy.regions;
    const isLoading = loading || taxonomiesLoading;
  
    const locationCategory = this.getLocationCategory();
    const locationSubCategory = !taxonomiesLoading && this.getLocationSubCategory();

    const locationName = `${locationCategory}${locationSubCategory  ? `, ${locationSubCategory}` : ''}`;

    return (
      <ListingPage>
        {/* <ModalDialog
          title='Search'
          type={ModalDialogs.searchListing}
          footer={null}
          // onOk={this.searchListing}
          // okDisabled={!locationCascaderValue}
          // okText={'Search'}
          >
            <SearchControl>
              <LocationSearchControl {...{...this.props, locationCascaderValue}}/>
              <SearchButton
                disabled={!locationCascaderValue}
                onClick={this.searchListing}/>
            </SearchControl>
         </ModalDialog> */}
        <MainContent>
          <MobileTitleHeader 
            small
            title={(
              !isLoading
                ? (
                <React.Fragment>
                  Found {hasListing || 0} {hasListing === 1 ? 'ride' : 'rides'} in {locationName}
                  {/* {locationSubCategory && <b style={{fontSize: 'larger'}}>&nbsp;/&nbsp;</b>} */}
                </React.Fragment>
                )
                : (
                  <React.Fragment>
                    Searching for rides in {locationName}
                  </React.Fragment>
                )
            )}
            // secondaryTitle={isLoading ? '' : ` (${hasListing || 0} ${hasListing === 1 ? 'ride' : 'rides'})`}
            />
          <MainSection>
            <FilterSideBar>
                <div>
                  {/* <FilterSection>Filters</FilterSection> */}
                  <FilterSection>
                    {/* <Button icon='environment' onClick={() => actions.displayModalDialog(ModalDialogs.searchListing)}>Search By Location</Button> */}
                  </FilterSection>
                </div>
            </FilterSideBar>
              <ResultsSection>
                {/* <ResultsHeader>
                  Results {`- ${locationCategory}`}
                  {locationSubCategory && <b style={{fontSize: 'larger'}}>&nbsp;/&nbsp;</b>}
                  {locationSubCategory}
                  {isLoading ? '' : ` (${hasListing || 0} rides)`}
                </ResultsHeader> */}
                {isLoading
                  ? (
                    <VehiclesList>
                      <ListingItem>
                        <Skeleton active />
                      </ListingItem>
                      <ListingItem>
                        <Skeleton active />
                      </ListingItem>
                      <ListingItem>
                        <Skeleton active />
                      </ListingItem>
                    </VehiclesList>
                  ) 
                  : (
                    <React.Fragment>
                      {!hasListing && <NoResultsFound>No Results</NoResultsFound>}
                      {!!hasListing &&  <VehiclesList>{
                        [...items.values()]
                        .filter(listing => listing.id)
                        .map(listing => this.renderListingDetails(listing))}
                      </VehiclesList>
                      }
                    </React.Fragment>
                  )
                }
            </ResultsSection>
          </MainSection>
        </MainContent>
      </ListingPage>
    );
  }
}

export default withRouter(SearchListings);