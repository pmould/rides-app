import React from 'react';
import styled, {css} from 'styled-components';
import {styledMedia} from './styled-components';
export const MobileTitleHeader = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  ${styledMedia.lessThan('desktop')`
    display: flex;
    justify-content: space-between;
    align-items: stetch;
    height: 50px;
    background: #333;
    color: white;
    position: relative;
  `}

  // ${styledMedia.greaterThan('desktop')`
  //   ${props => !props.only && css`
  //     display: none;
  //   `};
  // `}

  ${styledMedia.greaterThan('desktop')`
    ${props => !props.only && css`
      // display: flex;
      // justify-content: ${props => props.center ? 'center' : 'flex-start'};
      // font-size: 48px;
      margin-top: 1em;
    `}
  `}
`;


export const MobileTitleHeaderText = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  justify-content: center;
  ${styledMedia.greaterThan('desktop')`
    margin: 0 auto;
    ${props => !props.only && css`
      display: flex;
      justify-content: ${props => props.center ? 'center' : 'flex-start'};
      font-size: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      ${props => props.small && css`
        font-size: 24px;
      `}
    `}
  `}
`;

export const RightHeaderSection = styled.div`
  display: flex;
  align-items: stretch;
  position: absolute;
  right: 0;
  height: 50px;
`;

export const TitleTextSecondary = styled.div`
  ${styledMedia.greaterThan('desktop')`
    font-size: 24px;
    ${props => props.small && css`
      font-size: 18px;
    `}
  `}
`;

export const HeaderWrapper = styled.div`
 position: relative;
 ${styledMedia.greaterThan('desktop')`
  ${props => props.headerImg && css`
    background: url(${props => props.headerImg}) no-repeat;
    height: 125px;
    background-size: cover;
    background-position-x: 50%;
  `}
 `}
`;

export default function mobileTitleHeader({title, secondaryTitle, rightSection, only, small, headerImg}) {
  return (
    <HeaderWrapper {...{headerImg}}>
      <MobileTitleHeader small={small} only={only}>
        <MobileTitleHeaderText small={small}>
          {title}{secondaryTitle && <TitleTextSecondary small={small}>&nbsp;{secondaryTitle}</TitleTextSecondary>}
        </MobileTitleHeaderText>
        <RightHeaderSection>
          {rightSection}
        </RightHeaderSection>
      </MobileTitleHeader>
    </HeaderWrapper>
  )
}