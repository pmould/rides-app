import styled, {css} from 'styled-components';
import {Button, Input} from 'antd';

export const ListingPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MainContent = styled.div`
  margin: 1.25em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  margin-bottom: .5em;
`;

export const VehicleSelectCard = styled.div`;
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
`;

export const SelectItemCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;

  div:first-child { 
    margin-bottom: 0.5em;
  }
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

export const PrimaryButton = styled(StyledButton)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
};

export const StyledInput = styled(Input)`
  max-width: 200px;
  ${props => props.invalid && !props.addonBefore && css`
    border: 1px solid red;
  `}

  input {
    ${props => props.invalid && css`
      border: 1px solid red;
    `}
  }
`;

export const Styled = styled(Input)`
  max-width: 200px;
`;

export const StyledTextArea = styled(Input.TextArea)`
  max-width: 750px !important;
  ${props => props.invalid && css`
    border: 1px solid red;
  `}
`;

