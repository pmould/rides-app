import React from 'react';
import styled, {css} from 'styled-components';

import {Spin, Icon} from 'antd';

export const LoadableContent = styled.div`
  ${props => props.loading && css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  `}
`;

export default function loadableContent({loading, children}) {
  return (
    <LoadableContent loading={loading}>
      {loading
        ? <Spin indicator={<Icon type='loading' style={{ fontSize: 36 }} spin />} />
        : children}
    </LoadableContent>
  );
}