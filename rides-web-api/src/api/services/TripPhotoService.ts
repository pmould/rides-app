import {FabrixService as Service} from '@fabrix/fabrix/dist/common'


/**
 * @module TripPhotoService
 * @description TODO document Service
 */
export class TripPhotoService extends Service {
  async save(file, reservationId, accountId) {

    const {TripPhoto} = this.app.models
    const {S3UploadService} = this.app.services
    
    const {message, photoUrl} = await S3UploadService.handleFileUpload(`reservationTripPhotos/${reservationId}`, file);

   return TripPhoto.create({
    reservationId,
    accountId,
    url: photoUrl
    })

  }

  async delete(listingId, tripPhotoId) {
    const {TripPhoto} = this.app.models

    return TripPhoto.destroy({
      where: {id: tripPhotoId}
    })
  }
}

