import React from 'react';

import {PhotoModal, PhotoModalBody, PhotoModalHeader, PhotoModalBackBtn, DeletePhotoBtn,
  UpdatePhotoDescription, PhotoDescriptionInputLabel, PhotoDescription, PhotoModalContent,
   PhotoModalPhoto} from './styled-components';
import { debug } from 'util';

const modalRoot = document.getElementById('modal-root');
class TripPhotoModal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement('div');
    this.tripPhotoInput = React.createRef();
    this.tripPhotoDescriptionInput = React.createRef();
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    modalRoot.appendChild(this.el);
    this.tripPhotoDescriptionInput.current.focus();
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    document.body.style.overflow = '';
  }

  componentDidUpdate(prevProps) {
    // const {currentTripPhoto: {id: tripPhotoId, accountId: photoAccountId}, accountId} = this.props;
    // const allowUpdate = photoAccountId === accountId;
    // const {currentTripPhoto: {id: prevTripPhotoId}} = prevProps;
    // if (allowUpdate && tripPhotoId && (tripPhotoId !== prevTripPhotoId)) {
    //   this.tripPhotoDescriptionInput.current.focus();
    // }
  }

  componentDidUpdate(prevProps) {
    const {currentTripPhoto: {id: tripPhotoId, accountId: photoAccountId}, accountId} = this.props;
    const allowUpdate = photoAccountId === accountId;
    const {currentTripPhoto: {id: prevTripPhotoId}} = prevProps;
    if (allowUpdate && tripPhotoId && (tripPhotoId !== prevTripPhotoId)) {
      this.tripPhotoDescriptionInput.current.focus();
    }
  }

  render() {
    const {currentTripPhoto, actions, accountId} = this.props;
    const allowUpdate = currentTripPhoto.accountId === accountId;

    return (
      <React.Fragment>
        {currentTripPhoto.id && (
          <PhotoModal>
            <PhotoModalBody>
              <PhotoModalHeader>
                <div>
                  <PhotoModalBackBtn
                    onClick={() => actions.hideTripPhotoModal()}/>
                  {allowUpdate && <DeletePhotoBtn
                    onClick={() => actions.deleteTripPhoto(currentTripPhoto.id)}/>}
                </div>
                {allowUpdate
                  ? (
                  <UpdatePhotoDescription
                    ref={this.tripPhotoDescriptionInput}
                    clear
                    disabled={!allowUpdate}
                    value={currentTripPhoto.description}
                    onBlur={(text) => actions.updateTripPhoto(currentTripPhoto)}
                    onChange={(text) => actions.setTripPhotoDescription(text)}
                    placeholder='Enter Photo Description'>
                    <PhotoDescriptionInputLabel>Description</PhotoDescriptionInputLabel>
                  </UpdatePhotoDescription>
                  )
                  : (
                    <PhotoDescription>
                      {currentTripPhoto.description}
                    </PhotoDescription>
                  )}
              </PhotoModalHeader>
              <PhotoModalContent>
                <PhotoModalPhoto src={currentTripPhoto.url}/>
              </PhotoModalContent>
            </PhotoModalBody>
          </PhotoModal>
        )}
      </React.Fragment>
    )
  }
}

export default TripPhotoModal;