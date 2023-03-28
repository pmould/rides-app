import styled from 'styled-components';

import {Content, Wrapper, styledMedia} from '../../components/styled-components';

import {Button, DatePicker, TimePicker, Rate, Skeleton as AntSkeleton} from 'antd';
import {Button as MButton} from 'antd-mobile';
import {Link} from 'react-router-dom';

export const Skeleton = styled(AntSkeleton)`
`;

export const CheckoutMobileButton = styled(MButton)`
  width: 100%;
  max-width: 350px;
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 0.5em;
  ${styledMedia.greaterThan('desktop')`
    display: none !important;
  `}
`;

CheckoutMobileButton.defaultProps = {
  type: 'primary'
}

export const ListingPage = styled(Wrapper)`
  flex-direction: column;
`;

export const MainContent = styled(Content)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em;

  ${styledMedia.lessThan('desktop')`
    display: flex;
    flex-flow: column;
    align-items: stretch;
  `}
`;

export const SideBar = styled.div`
  position: relative;
  top: -4em;
  width: 24em;
  margin-left: 1em;

  ${styledMedia.lessThan('desktop')`
    width: initial;
    display: flex;
    flex-flow: column;
    margin-left: initial;
    top: -3.5em;
  `}

  ${styledMedia.lessThan('tablet')`
    top: -3em;
  `}
`;

export const SideBarSkeleton = styled(SideBar)`
  top: initial !important;
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${styledMedia.lessThan('desktop')`
    order: 2;
    display: flex;
    align-items: stretch;
    padding-bottom: 1em;
    border-bottom: 1px solid lightgray;
  `}
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
`;

export const NavLink = styled(Link)`
`;


export const ListingItem = styled.div`
  display: flex;
  flex-direction: column;
  // min-width: 25em;
  margin-bottom: 1em;
  flex-basis: 50%;
`;

export const ListingCoverPhotoWrapper = styled.div`
  max-width: 100%;
  flex: 1;
  background: black;
`;

export const ListingCoverPhotoResponsiveWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 35% 0 0 0;
  overflow: hidden;
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
`;


export const ListingInfo = styled.div`
  flex: 1;

  ${styledMedia.lessThan('desktop')`
    order: 1;
    display: flex;
    flex-flow: column;
    width: 100%;
    align-self: center;
  `}
`;

export const Info = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1em;

  ${styledMedia.lessThan('desktop')`
    max-width: 500px;
    align-self: center;
    width: 100%;
  `}
`;

export const InfoLabel = styled.div`
  flex: 1;
  font-weight: bold;

  ${styledMedia.lessThan('desktop')`
    flex: 1;
  `}
`;

export const InfoText = styled.div`
  flex: 4;
  margin-left: 0.5em;
  word-break: break-word;

  ${styledMedia.lessThan('desktop')`
    flex: 1;
  `}
`;

export const VehicleInfo = styled(Info)`
`;

export const VehicleInfoYear = styled(InfoText)`
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
`;

export const PriceLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0.5em 1em 0.5em;
  background: white;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  line-height: normal;

  ${styledMedia.lessThan('desktop')`
    order: 0;
    width: 10em;
    align-self: flex-end;
  `}
`;


export const PriceLabel2 = styled.div`
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
  justify-content: center;
`;

export const DailyRateNumber = styled.div`
  font-size: 2.25em;
  padding-left: 0.1em;
  line-height: 1;
  ${styledMedia.lessThan('desktop')`
    font-size: 1.5em;
  `}

  ${styledMedia.lessThan('tablet')`
    font-size: 1em;
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
  align-items: flex-end;
  position: relative;
  top: 8px;
  left: 5px;
  ${styledMedia.lessThan('desktop')`
    font-size: 0.75em;
  `}
`;

export const DateTimeRow = styled.div`
  padding: 0.5em;
`;

export const DateTimePicker = styled.div`
  display: flex;
`;

export const AntDatePicker = styled(DatePicker)`
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

`;

export const AntTimePicker = styled(TimePicker)`
  input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const CheckoutButton = styled(Button)`
  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;

export const Host = styled.div`
  display: flex;
  flex-direction: column;

  ${styledMedia.lessThan('desktop')`
    order: 1;
    margin: 1em 0;
  `}
`;

export const HostNamePic = styled.div`
  display: flex;
  align-items: center;
  maring-bottom: 2em;
`;

export const HostRating = styled(Rate)`
`;

export const HostImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: white;
  border: 1px solid #333;
  margin-right: 1em;
  cursor: pointer;
`;
