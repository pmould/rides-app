import React from 'react';

import {FooterWrapper, FooterContent, CopyRight} from './styled-components';

class Footer extends React.Component {
  render() {
    const {fullHeight} = this.props;
    return (
      <FooterWrapper fullHeight={fullHeight}>
        <FooterContent>
          <CopyRight> &copy; 2018</CopyRight>
        </FooterContent>
      </FooterWrapper>
    );
  }
}

export default Footer;