import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module ListingPhotoService
 * @description TODO document Service
 */
export class ListingPhotoService extends Service {
  async save(listingId, file) {

    const {ListingPhoto} = this.app.models
    const {S3UploadService} = this.app.services
    
    const {message, photoUrl} = await S3UploadService.handleFileUpload(`listingPhotos/${listingId}`, file);

   return ListingPhoto.create({
    listingId,
    photo: photoUrl
    })
  }

  async delete(listingId, listingPhotoId) {
    const {ListingPhoto} = this.app.models

    return ListingPhoto.destroy({
      where: {id: listingPhotoId}
    })
  }
}

