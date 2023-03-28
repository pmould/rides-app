import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
const {odometerOptions} = require('../constants/Enums')

/**
 * @module ListingController
 * @description Listing Controller.
 */
export class ListingController extends Controller {
  async update(request, h) {
    const {auth: {credentials: {accountId, accountTypeId}}, params: {listingId = null}} = request

    let unSavedListing = request.payload
    const {ListingService} = this.app.services

    unSavedListing.hostId = accountId
    unSavedListing.hostTypeId = accountTypeId
    delete unSavedListing.accountId
    delete unSavedListing.accountTypeId

    const listing = await ListingService.save(listingId, unSavedListing)

    return listing
  }

  async create(request, h) {
    const {auth: {credentials: {accountId, accountTypeId}}} = request
    let unSavedListing = request.payload
    const {ListingService} = this.app.services

    unSavedListing.hostId = accountId
    unSavedListing.hostTypeId = accountTypeId
    delete unSavedListing.accountId
    delete unSavedListing.accountTypeId

    const listing = await ListingService.create(unSavedListing)

    return listing
  }

  async getById(request, h) {
    const {params: {listingId = null}} = request
    const {Listing} = this.app.models
    return Listing.findByIdDefault(listingId)
  }
  /**
   *
   * @param req
   * @param res
   */
  findAll(req, res) {
    const orm = this.app.models
    const Listing = orm['Listing']
    const limit = Math.max(0, req.query.limit || 10)
    const offset = Math.max(0, req.query.offset || 0)
    const sort = req.query.sort || [['created_at', 'DESC']]
    const where = req.jsonCriteria(req.query.where)

    Listing.findAndCountAll({
      order: sort,
      offset: offset,
      limit: limit,
      where: where
    })
  }

  async getAll(request, h) {
    const {auth: {credentials: {accountId, accountTypeId}}} = request
    const {ListingService} = this.app.services

    const listing = await ListingService.getAll(accountId)

    return listing
  }

  async savePhoto(request, h) {
    const {query: {listingId}} = request

    const {file = {}} = request.payload || {}
    const {ListingPhotoService} = this.app.services

    const filesResponse = await ListingPhotoService.save(listingId, file)

   return filesResponse
  }

  async deletePhoto(request, h) {
    const {params: {listingId, listingPhotoId}} = request

    const {ListingPhotoService} = this.app.services

    const res = await ListingPhotoService.delete(listingId, listingPhotoId)

    return h.response().code(204)
  }

  async publish(request, h) {
    const {params: {listingId}} = request

    const {ListingService} = this.app.services

    const response = await ListingService.publish(listingId)

    return h.response().code(204)
  }

  async delete(request, h) {
    const {params: {listingId}} = request

    const {ListingService} = this.app.services

    const response = await ListingService.delete(listingId)

    return h.response().code(204)
  }
}

