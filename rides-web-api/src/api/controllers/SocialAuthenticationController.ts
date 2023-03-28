import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
const Wreck = require('wreck')
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

const {facebookAccessToken, googleAppId, jwtSecret} = require('../constants')

const googleClient = new OAuth2Client(googleAppId)

/**
 * @module SocialAuthenticationController
 * @description Authenticate User via oath2 social login.
 */
export class SocialAuthenticationController extends Controller {
  async validateFacebookLogin(inputToken, expires) {
    const expiresIn = expires || 0
    if((expiresIn <= 0) && !inputToken) {
      return false
    }

    const uri = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${facebookAccessToken}`
    try {
      const {payload} = await Wreck.get(uri)
      const parsedPayload = JSON.parse(payload.toString())
      const {data = {}} = parsedPayload
      if (data.error) {
        console.log(data.error.message)
        return false
      }
    } catch(ex) {
      console.log(ex)
      return false
    }

    return true
  }

  async validateGoogleLogin(tokenId) {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: googleAppId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  
    const {payload: tokenInfoPayload} = await Wreck.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`);

    return true;
  }

  async authenticateUser(request, h) {
    const provider = request.params.provider
    const {payload: {token, tokenId, profile, expires, test}} = request
    const { User, GoogleAccount, FaceBookAccount} = this.app.models
    const {UserService, SocialAuthenticationService, AccountService} = this.app.services

    // Check if user exists with email
    const existingUser = await User.findByEmail(profile.email);

    let valid
    let noSocialAccount;
    switch(provider) {
      case 'facebook': {
        if (existingUser && !existingUser.facebookAccount) {
          noSocialAccount = true;
        }
        valid = await this.validateFacebookLogin(token, expires)
        break
      }
      case 'google': {
        if (existingUser && !existingUser.googleAccount) {
          noSocialAccount = true;
        }

        valid = await this.validateGoogleLogin(tokenId).catch(console.error);
        break
      }  
    }

    if (!valid) {
      return Boom.unauthorized(`Authentication failed: Failed to validate ${provider} login credentials`)
    }

    if (noSocialAccount) {
      const account = await SocialAuthenticationService.saveSocialAuthUserDetails(provider, profile, existingUser);
    }

    let newUser
    if(!existingUser) {
      const [createdUser, created] = await UserService.create(profile)
      newUser = createdUser
      if(created) {
        // Refactor to create new user account using User.create() with facebbokAccount assocciation
        const account = await SocialAuthenticationService.saveSocialAuthUserDetails(provider, profile, createdUser)
        if(!(account && account.id)) {
          console.log('Social Account details was not saved')
        }
        //newUser.facebookAccount = fbAccount
      }
      else {
        console.log('Account with email already exists')
        return h.response({
          accountTaken: true,
          message: 'Account with email address already exists',
          statudCode: 401
        }).code(401);
      }
    }
    const user = newUser || existingUser
    const {id: userId, accountId, accountTypeId} = user

    const authToken = JWT.sign({
      userId,
      accountId,
      accountTypeId
    }, jwtSecret, {
      expiresIn: '2h'
    })

    const userAccount = await UserService.get(userId)

    return h.response(userAccount)
      .header('Authorization', authToken)
      .header('Access-Control-Expose-Headers', 'Authorization')
  }
}
