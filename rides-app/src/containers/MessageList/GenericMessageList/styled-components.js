import {ContentFooter, SPagination, styledMedia} from '../../../components/styled-components';
import styled from 'styled-components';

import {Icon as AntIcon, Spin, Skeleton} from 'antd';

export {ContentFooter, SPagination};
export const Icon = styled(AntIcon)``;

export const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;

export const NoMessages = styled.div`
  color: #333;
  padding-left: 8px;
`;
export const Messages = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #CCC;
  z-index: 1; 
`;


export const StyledSpin = styled(Spin)`
  height: 100%;
  opacity: 1;
  display: flex !important;
  align-items: center;
  justify-content: center;
`; 
export const StyledSkeleton = styled(Skeleton)`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;

export const OverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;


// export const StyledSpin = styled(Spin)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   opacity: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `; 

// export const StyledSkeleton = styled(Skeleton)`
//   padding: 20px;
//   border-bottom: 1px solid lightgrey;
// `;

export const MessageRow = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  padding: 0 1em;
  background: ${props => props.notified ? 'white' : 'lightGray'}

  ${styledMedia.lessThan('desktop')`
    cursor: pointer;

    &:active {
      background: #eee;
    }
  `}
`;

export const MessageRowItem = styled.div`
  margin-left: 1em;
  padding: 1em;
  ${styledMedia.lessThan('tablet')`
    margin-left: 0.25em;
    padding: 0.25em;
  `}
`;

export const UserImageItem = styled(MessageRowItem)`
  img {
    cursor: pointer;
  }
`;

export const DateItem = styled(MessageRowItem)`
  flex: 1;
  ${styledMedia.lessThan('tablet')`
    display: flex;
    justify-content: space-between;
  `}
`;

export const DescriptionItem = styled(MessageRowItem)`
  flex: 4;

  > div {
    cursor: pointer;
  }

  ${styledMedia.lessThan('tablet')`
    // width: 45px;
    // height: 45px;
    display: none;
  `}
`;

export const StatusItem = styled(MessageRowItem)`
  flex: 1;
`;

export const UserImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 75px;

  ${styledMedia.lessThan('tablet')`
    width: 45px;
    height: 45px;
  `}
`;

export const UserMessageDetails = styled.div`
  display: flex;
  flex: 1;
  ${styledMedia.lessThan('tablet')`
    flex-direction: column;
  `}
`;

export const Total = styled.div`
  ${styledMedia.lessThan('tablet')`
    display: none;
  `}
`;