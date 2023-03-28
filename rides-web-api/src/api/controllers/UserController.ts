import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
import { userInfo } from 'os';
import { models } from 'api';
import { User } from 'api/models';

import * as Boom from 'boom';
const browserDetect = require('browser-detect');

/**
 * @module UserController
 * @description TODO document Controller.
 */
export class UserController extends Controller {
  async get(request, h) {
    const {auth: {credentials: {userId}}} = request
    const {User} = this.app.models;

    return User.findByIdDefault(userId);
  }

  async registerWebNotifiction(request, h) {
    const {auth: {credentials: {userId}}, payload: webPushSubscriptionPayload, headers} = request;
    const {User, WebPushSubscription} = this.app.models;
    const {endpoint = {}} = webPushSubscriptionPayload || {} as Partial<NonNullable<typeof webPushSubscriptionPayload>>

    // TODO: allow updating activation without subscription object - undo if this is not the use case
    // if (!endpoint) {
    //   return Boom.internal('Invalid web notification subscription object');
    // }

    const userAgent = headers['user-agent'];

    const {name: browser} = browserDetect(userAgent);

    const webPushSubscription = await WebPushSubscription.findOne({
      where: {
        userId,
        browser
      }
    });
    let updateAttributes = {
      isActive: true
    }
    if (webPushSubscriptionPayload) {
      updateAttributes['subscription'] = JSON.stringify(webPushSubscriptionPayload);
    }

    if (webPushSubscription) {
      await webPushSubscription.updateAttributes(updateAttributes);
    }
    else {
      const createdSubscription = await WebPushSubscription.create({
        userId,
        browser,
        ...updateAttributes
      });
    }

    return User.findByIdDefault(userId);
  }

  async unregisterWebNotifiction(request, h) {
    const {auth: {credentials: {userId}}, headers} = request;
    const {User, WebPushSubscription} = this.app.models;
    const userAgent = headers['user-agent'];
    const {name: browser} = browserDetect(userAgent);

    const webPushSubscription = await WebPushSubscription.findOne({
      where: {
        userId,
        browser
      }
    });

    if (webPushSubscription) {
      await webPushSubscription.updateAttributes({
        isActive: false
      });
    }

    return User.findByIdDefault(userId);
  }

  async saveProfilePicture(request, h) {
    const {payload: {file}, params: {userId}} = request;
    const {User} = this.app.models;
    const {S3UploadService} = this.app.services;

    const {message, photoUrl} = await S3UploadService.handleFileUpload(`user/${userId}`, file);

    const user = await User.findById(userId);
    await user.update({
      picture: photoUrl
    });

    return user;
  }

  async saveCoverPhoto(request, h) {
    const {payload: {file}, params: {userId}} = request;
    const {User} = this.app.models;
    const {S3UploadService} = this.app.services;

    const {message, photoUrl} = await S3UploadService.handleFileUpload(`user/${userId}`, file);

    const user = await User.findById(userId);
    await user.update({
      coverPhoto: photoUrl
    });
    
    return user;
  }

  async patch(request, h) {
    const {payload = {}, params: {userId}} = request;
    const {User} = this.app.models;
    const user = await User.findById(userId);

    const updatedUser = await user.update(payload);

    return updatedUser;
  }
}

