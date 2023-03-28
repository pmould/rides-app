import React from 'react';

import {DefaultButton, ListingPage, NavigationButtons, PhotosCard,
  PrimaryButton, SectionTitle, VehiclePhotos, UploadWrapper} from './styled-components';

import {authToken} from '../../../utils/api';
import {Upload, Icon, Modal} from 'antd';

import history from '../../../history';

class Photos extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  saveListingPhotos = (listing) => {
    const {actions, nextStateId} = this.props;
    const {photos} = listing;

    const errors = [];
    if (!photos.size) {
      errors.push('Must have at least one photo to continue');
    }

    if (errors.length > 0) {
      // Display Errors

    const errorMessage = errors.map((error, i) => <div key={i}>{error}</div>);
    const errorMessageReactNode = <div>{errorMessage}</div>;
      actions.setListingErrors(errorMessageReactNode);
    }
    else {
      if (nextStateId) {
        actions.saveListingPhotosStage({...listing, registerListingStateId: nextStateId});
      }
      else {
        history.push('publish');
      }
    }
  }

  componentDidMount() {
    const {listing: {photos = {}}} = this.props;

    const fileList = [...photos.entries()]
      .map(([key, item]) => ({
        uid: key,
        name: 'xxx.png',
        status: 'done',
        url: item.photo
      }));

    this.setState({fileList});
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
    this.setState({fileList});
  }

  handleRemove = (file) => {  
    const {listing: {id: listingId}} = this.props;
    const {response, uid} = file;
    const photoId = (response && response.id) || uid;
    const {actions} = this.props;

    actions.deleteListingPhoto(listingId, photoId);
  }

  onSuccessOverride = (response, file)  => {
    const {actions} = this.props;
    this.uploadComponent.onSuccess(response, file);
    actions.addListingPhoto(response);
  };

  render() {
    const {listing, navigateBack} = this.props;
    const {id: listingId, published} = listing;
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadSection =  (
      <UploadWrapper className="clearfix">
        <Upload
          action={`http://localhost:8000/listings/photo?listingId=${listingId}`}
          listType="picture-card"
          fileList={fileList}
          accept='image/*'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          onSuccess={this.onSuccessOverride}
          headers={{
            'authorization': authToken,
            'X-Requested-With':  null
          }}
          ref={node => {this.uploadComponent = node}}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </UploadWrapper>
    );
    
    const content = (
      <PhotosCard  title='Car Photos'>
        <SectionTitle>Add Photos</SectionTitle>
        <VehiclePhotos>
          {uploadSection}
        </VehiclePhotos>
        <NavigationButtons>
          <DefaultButton
            onClick={navigateBack}
          >
            Back
          </DefaultButton>
          {!published && <PrimaryButton
            onClick={() => this.saveListingPhotos(listing)}
    
          >
            Next
          </PrimaryButton>}
        </NavigationButtons>
      </PhotosCard>
    );

    return (
      <ListingPage>
        {content}
      </ListingPage>
    );
  }
}

export default Photos;