import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
const {odometerOptions} = require('../constants/Enums')

/**
 * @module ListingController
 * @description Listing Controller.
 */
export class SearchListingsController extends Controller {

  async getSearchListings(request, h) {
    const {auth: {credentials}, query} = request;

    const {accountId} = credentials || {} as Partial<NonNullable<typeof credentials>>

    const {ListingService} = this.app.services

    const searchListings = await ListingService.getSearchListings(query, accountId)

    return searchListings
  }
}
