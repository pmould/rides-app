import styled, {css} from 'styled-components'; 

import {Content, Wrapper, styledMedia} from '../../components/styled-components';

import {Button, Icon, Menu} from 'antd';

import {Link} from 'react-router-dom';

import media from 'styled-media-query';


export const RealtimeConnected = styled.div`
  position: absolute;
  left: 0;
  ${styledMedia.lessThan('desktop')`
    font-size: 10px;
  `}
`;

export const HeaderWrapper = styled(Wrapper)`
  background: #333;
  background: rgb(252, 209, 22);
  color: #333;
  height: 55px;
  display: flex;
  padding: 0 1em;
`;

export const HeaderContent = styled(Content)`
  flex-direction: row;
  align-items: center;
`;

export const LeftHeader = styled.div`
  flex: .5;
  display: flex;
  align-items: center;
  ${props => props.isSearchPage && css`
    flex: .3;
  `}
  ${styledMedia.lessThan('desktop')`
    /* screen width is less than 768px (medium) */
    /* display: none; */
  `}

  ${styledMedia.lessThan('tablet')`
    /* screen width is less than 768px (medium) */
    flex: .3;
  `}
`;

export const LogoLink = styled(Link)`
  font-size: 2em;
  // color: white;
  color: #333;
  display: flex;
  justify-content;
  :hover {
    text-decoration: none;
    // color: white;
    color: #333;
  }

  :active {
    color: #333;
    // color: white;
  }

  :focus {
    text-decoration: none;
  }

  ${styledMedia.lessThan('desktop')`
    font-size: 1.5em;
  `}

  ${styledMedia.lessThan('tablet')`
    font-size: 1em;
  `}
`;

export const AppNamePartOne = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  ${styledMedia.lessThan('desktop')`
    display: flex;
    flex: 0.5;
    justify-content: space-around;
  `}
  
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  flex: .7;

  ${styledMedia.lessThan('desktop')`
    /* screen width is less than 768px (medium) */
    flex: 1;
  `}
`;

export const HeaderNavItem = styled.div`
  // color: white;
  padding: 1em 1em;
  margin: 0 1em;
  cursor: pointer;

    ${styledMedia.lessThan('desktop')`
      padding: 0.5em;
      margin: 0;
    `}

  ${props => props.hiddenmobile && css`
    ${styledMedia.lessThan('desktop')`
      /* screen width is less than 768px (medium) */
      display: none;
    `}
  `}

  ${props => props.hiddenDesktop && css`
    ${styledMedia.greaterThan('desktop')`
      /* screen width is less than 768px (medium) */
      display: none;
    `}
  `}
`;

export const HeaderNavLink = styled(Link)`
  // color: white !important;
  color: #333 !important;
  padding: 1em 1em;
  margin: 0 1em;
  ${props => props.hiddenmobile && css`
    ${styledMedia.lessThan('desktop')`
      /* screen width is less than 768px (medium) */
      display: none;
    `}
  `}
`;

export const ListCarButton = styled(Button)`
  margin-left: 0.5em;
  width: 90px;
  border: 1px solid #333;
  color: #333;
  ${props => !props.loggedIn && css`
    margin-left: 100px;
  `}

  ${props => props.hiddenmobile && css`
    ${styledMedia.lessThan('desktop')`
      /* screen width is less than 768px (medium) */
      display: none;
    `}
  `}

  :hover {
    background: white !important;
    color: #333 !important;
    border-color: initial !important;
    border-color: white !important;
  }
`;

export const FindListingButtonHeader = styled(Button)`
  cursor: pointer;
  // color: white;
  color: #333;
  border: 1px solid #333;
  margin: 0 auto;

  :hover {
    background: white !important;
    color: #333 !important;
    border-color: initial !important;
    border-color: white !important;
  }

  ${styledMedia.greaterThan('desktop')`
    display: none;
  `}
`;

FindListingButtonHeader.defaultProps = {
  ghost: true
};

export const  FindListingSearchHeader = styled.div`
  display: flex;
  padding: 0 1em;
  flex: 1;
  ${styledMedia.lessThan('desktop')`
    display: none;
  `}
`;



export const HeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  // color: white;
  position: relative;
`;


export const LoginMenu = styled(Menu)`
`;


export const LoginMenuItem = styled(Menu.Item)`
  position: relative;
  width: 125px;
  border-bottom: ${props => props.border ? '1px solid lightgray' : ''};
  padding: 0.5em 1em;

  ${styledMedia.greaterThan('desktop')`
    ${props => props.hiddenDesktop && css`
      display: none;
    `}
  `}
`;

export const HeaderRightButton = styled.div`
  padding: 1em;
  cursor: pointer;

  ${props => props.hiddenmobile && css`
    ${styledMedia.lessThan('desktop')`
      display: none;
    `}
  `}
`;

export const User = styled.div`
  display: flex;
  margin-right: 6px;
`;

export const UserImage = styled.img`
  background: white;/*#333;*/
  background: #333;
  border-radius: 40px;
  // border: 1px solid white;
  border: 1px solid #333;
  width: 40px;
  height: 40px;

  ${props => props.isLoggedIn && css`
    display: none;
  `}
`;

export const DropDownInner = styled.div`
  display: flex;
  align-items: center;
`;

export const DownArrow = styled(Icon)`
  ${props => props.isLoggedIn && css`
    display: none;
  `}
`;

export const MessageIcon = styled(Icon) `
  font-size: 24px;
`;
MessageIcon.defaultProps = {
  type: 'message'
}

export const DashboardIcon = styled(Icon) `
  font-size: 24px;
`;
DashboardIcon.defaultProps = {
  type: 'dashboard'
}

DownArrow.defaultProps = {
  type: 'down-circle-o'
}

export const MobileNavBar = styled.div`

`;

export const MobileNavBarMenu = styled.div`
  z-index: 10;
  nav {
    display: none;

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      list-style: none;
      justify-content: flex-end;
      li {
        margin: 0;
        ${styledMedia.lessThan('desktop') `

          transform: translateX(-10px);
          opacity: 0;
        `}

        a {
          display: block;
          padding: 10px 20px;
          // color: white;
          transition: 0.3s;
        }
        &:hover {
          a {
            text-decoration: none;
            transform: translateY(-3px);
          }
        }
      }
    }
    ${props => props.active && css`
      ${styledMedia.lessThan('desktop') `
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292929;
      `}

      ul {
        ${styledMedia.lessThan('desktop')`
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        `}

        li {
          ${styledMedia.lessThan('desktop')`
            transform: translateX(0);
            opacity: 1;
            transition: 0.9s;

            ${generateMobuleMenuItemAnimationCSS()}
            a {
              color: #fff;
              color: #ccc;
              font-size: 24px;
            }
          `};
        }
      }
    `}
  }
`;

function generateMobuleMenuItemAnimationCSS(){
  let css = '';
  for (var i = 0; i < 10; i++) {
    css += `
      &:nth-child( #{$i} ) {
        transition-delay: #{$i * 0.15}s;
      }
    }`;
  }
return css;
};

export const MobileHamburgerMenu = styled.div`
  z-index: 10;
  ${styledMedia.greaterThan('desktop')`
    display: none;
  `}
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 3px;
  span {
    width: 36px;
    height: 3px;
    background-color: white;
    display: block;
    position: relative;
    transition: 0.3s;
    &:after {
      content: "";
      width: 36px;
      height: 3px;
      position: absolute;
      top: 9px;
      background-color: white;
      transition: 0.3s;
    }
    &:before {
      content: "";
      width: 36px;
      height: 3px;
      position: absolute;
      bottom: 9px;
      background-color: white;
      transition: 0.3s;
    }
  }

  ${props => props.active && css`
    span {
      background-color: transparent;
      &:before {
        transform: rotate(45deg);
        bottom: 0;
        background-color: #fff;
      }
      &:after {
        transform: rotate(-45deg);
        background-color: #fff;
        top: 0;
      }
    }
  `};
`;
