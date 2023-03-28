import styled, {css} from 'styled-components';

import {Content, Wrapper} from '../styled-components';

export const FooterWrapper =  styled(Wrapper)`
  min-height: 51px;
  margin-top: -51px;
  background: #333;
  background: rgb(252, 209, 22);
  color: #fff;
  color: #333;
  ${props => props.fullHeight && css`
    display: none;
  `}
`;

export const FooterContent =  styled(Content)`
  padding: 1em;
`;

export const CopyRight = styled.div`
  font-size: 11px;
`;

