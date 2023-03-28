import styled, {css} from 'styled-components';
import {styledMedia} from '../../../components/styled-components';
import {Cascader, Button, Icon} from 'antd';


export const SearchControl = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 27em;
  padding: 25px 0;
  ${styledMedia.lessThan('desktop')`
    padding-bottom: 1em;
  `}
`;

export const SearchButton = styled(Button)`
  margin-left: 8px;
  border: 1px solid #white;
  ${props => props.size === 'large' && css`
    padding-left: 11px !important;
    padding-right: 11px !important;
    
    :disabled .anticon {
      color: #ccc !important;
    }
  `}
  :disabled, [disabled]:hover {
    background: none !important;
    border: none !important;
    color: white !important;
  }
  ${props => props.searchcolor && css`
    background: ${props.searchcolor} !important;
    color: #333 !important;
  `}

  :hover {
    border: 1px solid #333;
  }
`;

SearchButton.defaultProps = {
  // type: 'primary',
  icon: 'search'
}

export const LocationCascader = styled(Cascader)`
  flex: 1;
  
  ${props => props.inputSize === 'small' && css`
    padding: 0;
    flex: 1;
  `}

  .ant-cascader-picker-label {
    display: flex;
    height: 30px;
    margin-top: -15px;
  }
`;

LocationCascader.defaultProps = {
  popupClassName: 'locationCascader'
}

export const LocationLabel = styled.span`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: 1;
`;

export const LeftLocationLabel = styled(LocationLabel)`
  padding-right: 10px;
  border-right: 1px solid #d9d9d9;
`;

export const RightLocationLabel = styled(LocationLabel)`
  padding-left: 10px;
`;
