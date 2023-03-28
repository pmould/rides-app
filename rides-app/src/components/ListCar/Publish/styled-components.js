import styled from 'styled-components';
import {Button, Checkbox as AntCheckbox} from 'antd';

export const CheckBox = styled(AntCheckbox)`
  font-size: 32px;
`;

export const Options = styled.div`
  padding: 1em 0;

  input, .ant-checkbox-inner {
    margin-left: 0.5em;
    height: 22px;
    width: 22px;
  }
`;

export const ListingPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SectionCard = styled.div`;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const SectionTitle = styled.div`
  font-size: 1em;
  margin: .5em 0 1.5em 0;
  font-weight: bold;
`;

export const VehiclePublish = styled.div`

`;

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-top: 1em;
`;

export const AccountButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const LargeButton = styled(Button)`
  max-width: 12em;
  height: 3em;
  margin: 0.5em;
  flex: 1;
`;

export const NavigationButtons = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-right: 0.5em;
  width: 80px;
`;

export const DefaultButton = styled(StyledButton)`
`;
