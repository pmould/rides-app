import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

const {facebookAccessToken, jwtSecret} = require('../constants')

/**
 * @module SocialAuthenticationService
 * @description Authenticate User via oath2 social login
 */
export class SocialAuthenticationService extends Service {
  async saveSocialAuthUserDetails(provider, profile, user) {
    switch(provider) {
      case 'facebook': {

      }
      case 'google': {
        const {picture: pictureDetails, id: googleId} = profile
        const picture = pictureDetails.data && pictureDetails.data.url
        const googleAccount = this.app.models.GoogleAccount.build({googleId, picture})
        return await user.setGoogleAccount(googleAccount)
      }  
    }
  }
}

