import styled from 'styled-components';

import {styledMedia, Select, Input} from '../../styled-components';
import {Content as StyledContent, SelectItem} from '../styled-components';

import {Button} from 'antd';

import InputMask from 'react-input-mask';

export {SelectItem, Select};

export const ListingElegibilityPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

export const Content = StyledContent;

/*
export const Title = styled.div`
  font-size: 1.25em;
  margin-bottom: .5em;
`;
*/
export const VehicleSelectCard = styled.div`;
  display: flex;
  flex-direction: column;
  
  .ant-select {
    width: 150px;
  }

  @media (max-width: 960px) {
    .ant-card-body {
      width: 100%;
    }
    .ant-select {
      width: 100%;
    }
  }
`;


export const SelectTitle = styled.div`
  font-size: 1em;
  margin: .5em 0 1.5em 0;
  font-weight: bold;

  ${styledMedia.lessThan('tablet')`
    margin: 1.5em 0 0.5em;
  `}
`;

export const GHCodeTitle = styled.div`
  font-size: 1em;
  ${styledMedia.lessThan('tablet')`
    font-size: 0.8em;
    margin-top: 1em;

  `}
`

export const SectionItems = styled.div`
  display: flex;
  margin-bottom: 1em;
  margin-left: 1em;
  flex-direction: column;

  ${styledMedia.lessThan('tablet')`
    margin: 0;
  `};
`;

export const GhPostCode = styled.div`
  display: flex;

  ${styledMedia.lessThan('tablet')`
    flex-flow: column;
    justify-content: stretch;
  `};
}
`;

export const GhPostCodeTaxonomy = styled.div`
  border: 1px solid #555; //#1890ff;
  margin-left: 1em;
  max-width: 150px;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 4px 11px;
  width: 100%;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #555; //#1890ff;
  border-radius: 4px;
  transition: all .3s;
  background: #f5f5f5;
  
  ${styledMedia.lessThan('tablet')`
    margin: 0;
    max-width: 100%;
    margin-bottom: 1em;
  `};
`;

export const LocationPlaceholder = styled.div`
  color: lightgray;
`;

export const District = styled(GhPostCodeTaxonomy)`
  max-width: 200px;
`;

export const Region = styled(GhPostCodeTaxonomy)`
`;

export const StyledInputMask = styled(InputMask)`
  margin-bottom: 1em;
  max-width: 150px;
  ${styledMedia.lessThan('tablet')`
    max-width: 100%;
  `};
`;

export const StyledInput = styled(Input)`
  max-width: 200px;
`;

export const VehicleSelect = styled.div`
  display: flex;
  margin-bottom: 1em;

  @media (max-width: 960px) {
    flex-direction: column;
  }

`;

export const NavigationButtons = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-right: 0.5em;
  width: 80px;
`;

export const PrimaryButton = styled(StyledButton)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
};

