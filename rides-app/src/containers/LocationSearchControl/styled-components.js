import styled, {css} from 'styled-components';
import {styledMedia} from '../../components/styled-components';

import {Cascader} from 'antd';

export const ListingLocationControlWrapper = styled.div`
  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;

export const LocationCascader = styled(Cascader)`
  width: 27em;
  .ant-cascader-picker-label {
    display: flex;
    height: 30px;
    margin-top: -15px;
  }

  ${styledMedia.lessThan('tablet')`
    width: 100%;
    margin-bottom: 1em;
  `}

  ${props => props.invalid && css`
    border: 1px solid red;
  `}
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
