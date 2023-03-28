import styled from 'styled-components';

import {Button} from 'antd';

export const ListingPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PhotosCard = styled.div`;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ant-card-body > div {
    flex: 1;
  }
`;

export const VehiclePhotos = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-direction: row;
  flex: 1;

`;

export const UploadWrapper = styled.div`
  flex: 1;

  .ant-upload, .ant-upload-list-item {
    width: 175px;
    height: 175px;
  }
`;

export const SectionTitle = styled.div`
  font-size: 1em;
  margin: .5em 0 1.5em 0;
  font-weight: bold;
`;

export const NavigationButtons = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-right: 0.5em;
  width: 80px;
`;

export const DefaultButton = styled(StyledButton)`
`;

export const PrimaryButton = styled(StyledButton)`
`;

PrimaryButton.defaultProps = {
  type: 'primary'
};