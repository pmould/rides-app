import styled, {css} from 'styled-components';
import {styledMedia} from '../../styled-components';
import {Icon, Button} from 'antd';

export const TripSecondaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props => props.fullWidth && css`
    padding: 0.25em 1em;
  `}
  ${styledMedia.lessThan('desktop')`
    background: #333;
    padding: 0 1em;
  `}
`;

export const TripPerson = styled.div`
  font-size: 14px;
  color: white;
  padding: 0.25em;

  ${styledMedia.greaterThan('desktop')`
    color: #333;
  `}
`;

export const TripIcons = styled.div`
  display: flex;
  padding: 0.25em;
  right: 0;
  top: 0;

  ${styledMedia.lessThan('desktop')`

  `}

  ${styledMedia.lessThan('tablet')`

  `}
`;

export const TripIcon = styled(Icon)`
  display: flex;
  align-items: center;
  padding: 0.25em;
  border-left: 1px solid white;
  border: 1px solid gray;
  border-radius: 30px;
  margin: 0.25em;
  width: 38px;
  height: 38px;
  font-size: 15px;
  justify-content: center;
  background: ${props => props.theme === 'filled' ? 'white' : 'initial'}
  color: ${props => props.theme === 'filled' ? '#333' : 'white'}
  ${styledMedia.greaterThan('desktop')`
    color: ${props => props.theme !== 'filled' ? '#333' : 'white'}
    background: ${props => props.theme === 'filled' ? '#333' : 'initial'}
  `}
`;

export const ApproveButton = styled(Button)`
  width: 250px;
  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;

ApproveButton.defaultProps = {
};
