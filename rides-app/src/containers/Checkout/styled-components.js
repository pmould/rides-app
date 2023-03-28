import styled from 'styled-components';
import {Content, Wrapper, styledMedia} from '../../components/styled-components';
import { Card, Icon, Collapse, Button, Input, Checkbox as AntCheckbox} from 'antd';
import {Button as MButton} from 'antd-mobile';
import {Link} from 'react-router-dom';

export const CheckoutPage = styled(Wrapper)`
`;

export const MainContent = styled(Content)`
`;

export const NavLink = styled(Link)`
`;

export const CheckoutAccordion = styled(Collapse)`
  margin-bottom: 1em;
`;

export const CheckoutPanel = styled(Collapse.Panel)`
`;

export const CheckoutCard = styled.div`
  display: flex;
  padding: 1em;
  min-height: 575px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .ant-card-body > div:first-child {
    display: flex;
  }

  ${styledMedia.lessThan('tablet')`
    flex-flow: column;
  `}
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;

  ${styledMedia.lessThan('tablet')`
      flex: initial;
  `}
`;

export const TripSummary = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1em;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .ant-card-body > div:first-child {
    display: flex;
  }
`;

export const TripSummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TripDuration = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
`;

export const TripPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
`;

export const TripTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  font-weight: bold;
`;

export const SummaryDateTime = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SummaryDate = styled.div`
  flex: 1;
`;
export const SummaryTime = styled.div`
  flex: 1;
  color: #333;
`;

export const SummaryDateIcon = styled(Icon)`
  display: flex;
  align-items: center;
  padding: 1em 0.5em;
`;

SummaryDateIcon.defaultProps = {type:'caret-right'};

export const CheckBox = styled(AntCheckbox)`
  font-size: 32px;
`;

export const Options = styled.div`
  padding: 1em 0;
  display: flex;
  align-items: center;
  input, .ant-checkbox-inner {
    margin-left: 0.5em;
    height: 22px;
    width: 22px;
  }
`;

export const BookItButtonMobile = styled(MButton)`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 0.5em;

  ${styledMedia.greaterThan('tablet')`
    display: none !important;
  `}
`;

BookItButtonMobile.defaultProps = {
  type: 'primary'
}


export const BookItButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;

  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

export const StyledTextArea = styled(Input.TextArea)`
  max-width: 750px !important;
  min-height: 150px !important;
`;
