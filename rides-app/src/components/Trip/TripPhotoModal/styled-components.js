
import React from 'react';
import {Button as Dbutton, Icon} from 'antd';
import styled from 'styled-components';
import {Button, InputItem} from 'antd-mobile';

export const PhotoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, .8);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const PhotoModalBackBtn = styled(Icon)`
  padding: 1em;
`;

PhotoModalBackBtn.defaultProps = {
  type: 'arrow-left'
}
export const PhotoModalPhoto = styled.img`
  width: 100%;
`;

export const PhotoModalHeader = styled.div`
`;

export const DeletePhotoBtn = styled(Button)`
`;
export const DeletePhotoIcon = styled(Icon)`
  color: red;
`;
DeletePhotoIcon.defaultProps = {
  type: 'delete',
  theme: 'filled'
}
DeletePhotoBtn.defaultProps = {
  icon: <DeletePhotoIcon/>
}

export const UpdatePhotoDescription = styled(InputItem)`
`;

export const PhotoModalBody = styled.div`
  background: white;
  max-width: 750px;
  width: 100%;
`;

export const PhotoModalContent = styled.div`
`;

export const PhotoDescriptionInputLabel = styled.div`
  color: #ccc;
`;

export const PhotoDescription = styled.div`
  color: #333;
  font-size: 17px;
  height: 44px;
  padding-left: 15px;
`;