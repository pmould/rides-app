import styled from 'styled-components';
import {Content, Wrapper, styledMedia} from '../../components/styled-components';

import {Button, Tabs} from 'antd';

export const DashboardPage = styled(Wrapper)`
`;

const TabPane = Tabs.TabPane;

export const DashboardTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0.25em;
  }
`;

export const DashboardTab = styled(TabPane)`
`;

export const MainContent = styled(Content)`
`;

export const ThankYouText = styled.div`
  font-size: 24px;
`;

export const SectionDate = styled.div`
  padding: 1em;
  background: #333;
  color: white;
`;

export const SectionTrips = styled.div`
`;

export const TripFeedMain = styled.div`
  padding-left: 1em;
  flex: 1;
`;

export const ListingPrimaryPhoto = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 75px;
`;


export const TripFeedItem = styled.div`
  padding: 1em;
  border-bottom: 1px solid lightgray;
  display: flex;
  cursor: pointer;
  :hover {
    background: lightgray;
  }

  :active {
    background: #eee;
  }
`;

export const TripFeedStatus = styled.div`
  background: ${props => props.end ? 'red' : 'green'};
  border: 1px solid #333;
  border-width: 1px;
  border-color: ${props => props.end ? 'initial' : '#333'};
  border-style: solid;
  color: white;
  padding: 0.25em 0.5em;
  margin-bottom: 0.5em;
  display: inline-flex;
  border-radius: 1em;


`;

export const TripFeedContent = styled.div`
`;

export const TripFeedMessage = styled.div`
`;

export const TripFeedVehicle = styled.div`
`;

export const TripFeedLocation = styled.div`
`;

export const StartTripButton = styled(Button) `
`;

export const TripActions = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;

  ${styledMedia.lessThan('desktop')`
    display: none;
  `};
`;

StartTripButton.defaultProps = {
  type: 'primary'
}
