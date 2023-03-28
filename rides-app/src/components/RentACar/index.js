import React from 'react';

import {PopularCitiesList, RegionsList} from '../../constants';

import {Link} from 'react-router-dom';

import {SearchWrapper, Search, SearchTitle, SearchSelection, SearchSelectionItem, SearchItems, SearchItem} from './styled-components';

export class RentACar extends React.Component {
  render() {
    return (
      <SearchWrapper>
        <Search>
          <SearchTitle>Search Vehicles to Rent in Ghana</SearchTitle>
          <SearchSelection>
            <SearchSelectionItem>
              <SearchItems>
              <SearchItem>
                <Link to={{
                  pathname: `/searchListings`,
                  state: 'fromSearchNavLink'}}>All of Ghana</Link>
              </SearchItem>
              </SearchItems>
            </SearchSelectionItem>
            <SearchSelectionItem>
              Cities
              <SearchItems>
                {
                  PopularCitiesList.map(city => (
                    <SearchItem key={city.value}>
                      <Link to={{
                        pathname: `/searchListings`,
                        search: `?ghCityId=${city.value}`,
                        state: 'fromSearchNavLink'}}>{city.label}</Link>
                    </SearchItem>
                  ))
                }
              </SearchItems>
            </SearchSelectionItem>
            <SearchSelectionItem>
              Regions
              <SearchItems>
                {
                  RegionsList.map(region => (
                    <SearchItem key={region.value}>
                      <Link to={{
                        pathname: `/searchListings`,
                        search: `?ghPostCodeRegionId=${region.value}`,
                        state: 'fromSearchNavLink'}}>{region.label}</Link>
                    </SearchItem>
                  ))
                }
              </SearchItems>
            </SearchSelectionItem>
          </SearchSelection>
        </Search>
    </SearchWrapper>
    );
  }
}

export default RentACar;