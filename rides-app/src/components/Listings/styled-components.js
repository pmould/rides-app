import styled from 'styled-components';
import {Content, Wrapper, PageTitle, MainSection, styledMedia} from '../styled-components';

import {Card} from 'antd';
import {Link} from 'react-router-dom';

export {PageTitle};

export const ListingPage = styled(Wrapper)`
`;

export const MainContent = styled(Content)`
`;


export const NavLink = styled(Link)`
`;

export {MainSection}

export const VehiclesList = styled.div`
  display: flex;
  flex-flow: wrap;
  flex: 1;
`;

export const ListingItem = styled.div`
  display: flex;
  width: 25em;
  padding: 1em;
  flex-basis: 50%;

  ${styledMedia.lessThan('desktop')`
    flex-basis: 100%;
    width: initial;
    justify-content: center;
  `}
`;

export const ListingCoverPhotoWrapper = styled.div`
  width: 240px;
  flex: 1;
  width: 60%;
  background: black;
  ${styledMedia.lessThan('desktop')`
    width: 50%;
  `}
`;

export const ListingCoverPhotoResponsiveWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 56.25% 0 0 0;
  overflow: hidden;
`;

export const ListingCoverPhoto = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const VehicleInfo = styled.div`
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
  width: 40%;
  ${styledMedia.lessThan('desktop')`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`