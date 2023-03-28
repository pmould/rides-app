'use strict'

import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
import { request } from 'http';

import * as Boom from 'boom';

/**
 * @module TripPhotoController
 * @description TripPhoto Controller
 */
export class TripPhotoController extends Controller {
  async update(request) {
    const {payload} = request;
    const {TripPhoto} = this.app.models;

    const tripPhoto = await TripPhoto.update(payload)

    if (!tripPhoto) {
      return Boom.internal('Unable to perform operation')
    }

    return tripPhoto
  }

  async delete(request, h) {
    const {params: {tripPhotoId}} = request;
    const {TripPhoto} = this.app.models;

    const itemsDeleted = await TripPhoto.destroy({
      where: {id: tripPhotoId}
    });

    if (itemsDeleted === 0) {
      return Boom.internal('Unable to perform operation')
    }

    return h.response().code(204)
  }
}

