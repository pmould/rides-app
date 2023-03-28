import styled from 'styled-components';
import {Button} from 'antd';


export const ListingPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MainContent = styled.div`
  margin: 1.25em;
`;

export const VehicleSelectCard = styled.div`
  display: flex;
  flex-direction: column;
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .ant-card-body > div:first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const SelectsWrapper = styled.div`
  flex: 1;
`;

export const VehicleSelect = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-direction: column;
`;


export const SelectTitle = styled.div`
  font-size: 1em;
  margin: .5em 0 1.5em 0;
  font-weight: bold;
`;

export const SelectItem = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  > div { 
    margin-left: 1em;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  margin-right: 0.5em;
  width: 80px;
`;

export const DefaultButton = styled(StyledButton)`
`;

export const PrimaryButton = styled(StyledButton)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
};
