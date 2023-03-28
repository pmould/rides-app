import styled from 'styled-components';
import {Content, Wrapper, MainSection as StyledMainSection, styledMedia} from '../styled-components';

import {Card, Affix, Button} from 'antd';
import {Link} from 'react-router-dom';


export const MainSection = styled(StyledMainSection)`
  flex-direction: row;
  flex: 1;
`;


export const ListingPage = styled(Wrapper)`
  flex: 1;
`;

export const MainContent = styled(Content)`
  flex: 1;
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
`

export const NavLink = styled(Link)`
`;

export const ListingsCard = styled(Card)`
  display: flex;
  flex-direction: column;

  min-height: 575px;

  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);

  line-height: 1;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;


export const ResultsHeader = styled.div`
  display: flex;
  position: relative;
  font-size: larger;
  padding-bottom: 8px;
  align-items: center;
`;

export const FilterSideBar = styled(Affix)`
  display: flex;
  flex: 1;
  margin-right: 1em;
  margin-top: 25px;

  >div {
    flex: 1;
    display: flex;
    height: 100% !important;
  }

  >div>div {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-right: 1px solid #ddd;
    padding: 16px;
    padding-top: 0;
    margin-bottom: 55px;
  }

  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;

FilterSideBar.defaultProps = {
};

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

export const ChangeLocationLink = styled.div`
  padding-left: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export const RefsultsSection = styled.div`
  display: flex;
  height: 100%;
`;

export const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;

  ${styledMedia.lessThan('desktop')`
    padding: 0 1em;
  `}
`;
ResultsSection.defaultProps = {
  bordered: false
};

export const VehiclesList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NoResultsFound = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  font-size: 20px;
`;

export const ListingItem = styled.div`
  display: flex;
  flex-direction: column;
  // min-width: 25em;
  margin-bottom: 1em;
  flex-basis: 50%;
  color: #333;
`;

export const ListingCoverPhotoWrapper = styled.div`
  max-width: 100%;
  flex: 1;
  background: black;
  border-radius: 10px;
`;

export const ListingCoverPhotoResponsiveWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 60% 0 0 0;
  overflow: hidden;
  border-radius: 10px;
`;

export const ListingCoverPhoto = styled.img`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  object-fit: cover;
  border-radius: 
`;

export const VehicleInfo = styled.div`
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
  ${styledMedia.lessThan('desktop')`
    font-size: 1em;
  `}
`;

export const PriceLabel = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.5em 0.5em 0 0.5em;
  background: white;
  border-top-left-radius: 1em;
  line-height: normal;
`;

export const DailyRate = styled.div`
  display: flex;
`;

export const DailyRateNumber = styled.div`
  font-size: 2.25em;
  padding-left: 0.1em;
  line-height: 1;
  ${styledMedia.lessThan('desktop')`
  font-size: 1.5em;
  `}
`;

export const Currency = styled.div`
 font-size: 1em;
 line-height: 0.8em;
  ${styledMedia.lessThan('desktop')`
    font-size: 0.75em;
  `}
`;

export const PerDay = styled.div`
  display: flex;
  justify-content: flex-end;
  ${styledMedia.lessThan('desktop')`
    font-size: 0.75em;
  `}
`;

export const SearchControl = styled.div`
  display: flex;
  padding: 25px 0;
`;

export const SearchButton = styled(Button)`
margin-left: 8px;

`;

SearchButton.defaultProps = {
  type: 'primary',
  icon: 'search'
}