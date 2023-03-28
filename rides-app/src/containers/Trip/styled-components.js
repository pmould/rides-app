import styled, {css} from 'styled-components';
import {Content, ContentFooter, SPagination, PageList, ListItem, styledMedia} from '../../components/styled-components';

import {Button, Collapse, Icon} from 'antd';
import {List} from 'antd-mobile';

export {PageList, ListItem}

export const MainContent = styled(Content)`
  padding: 0;
`;

export const AccountTripPhotoSection = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 1em;
`;

export const AccountTripPhotoHeader = styled.div`
  display: flex;
`;

export const TripPhotosList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TripPhotoItem = styled.div`
  position: relative
  display: flex;
  width: 25em;
  flex-basis: 25%;
  justify-content: center;
  cursor: pointer;

  ${styledMedia.lessThan('desktop')`
    flex-basis: 50%;
  `}

  ${styledMedia.lessThan('tablet')`
    flex-basis: 100%;
    justify-content: center;
  `}
`;

export const TripPhotoWrapper = styled.div`
  position: relative;
  max-width: 240px;
  flex: 1;
  background: black;
`;

export const TripPhotoResponsiveWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 56.25% 0 0 0;
  overflow: hidden;
`;

export const TripPhoto = styled.img`
  position: absolute;
  display: block;
  max-width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const ShareLocationButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 14em;
`;

export const ShareLocationButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;
   margin: 0 1em;

  ${styledMedia.lessThan('tablet')`
    align-items: center;
       margin: 1em 1em;
  `}
`;

export const ResponsiveMapWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 35%;
`;

export const LastUpdatedAt = styled.div`
  color: #333;
  font-size: 12px;
`;

export const NoMap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TripCollapse = styled(Collapse)`
  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`


export const LocationIcon = styled(Icon)`
`;

LocationIcon.defaultProps = {
  type: 'environment'
}

