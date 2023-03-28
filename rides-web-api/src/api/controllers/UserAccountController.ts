import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
import * as Boom from 'Boom'
import * as JWT from 'jsonwebtoken'
import {UserAccountService} from '../services'

const {jwtSecret} = require('../constants')

/**
 * @module UserController
 * @description TODO document Controller.
 */
export class UserAccountController extends Controller {
  async activatAccount(request, h) {
    const {query: {authToken: confirmationEmailToken}} = request
    const {UserAccountService, UserService} = this.app.services

    const success = await UserAccountService.activateAccount(confirmationEmailToken)

    return h.response({success})
  }

  async verifyPasswordReset(request, h) {
    const {query: {authToken}} = request
    const {UserAccountService} = this.app.services

    const success = await UserAccountService.verifyPasswordReset(authToken)

    return h.response({success})
  }

  async sendResetPasswordEmail(request, h) {
    const {payload: {email}, query: {authToken}} = request
    const {UserAccountService} = this.app.services

    const success = await UserAccountService.sendResetPasswordEmail(email)

    return h.response({success})
  }
  
  async updatePassword(request, h) {
    const {payload: {password}, query: {authToken}, auth: {credentials}} = request;

    const {userId} = credentials || {} as Partial<NonNullable<typeof credentials>>
    const {UserAccountService} = this.app.services

    const success = await UserAccountService.updatePassword(password, authToken, userId)

    return h.response({success})
  }

  async login(request, h) {
    const {UserAccountService, UserService} = this.app.services
    const {payload = {}} = request
    const {email, password} = payload

    const {User} = this.app.models

    const user = await User.findByUserAccountEmail(email)
  
    if (!user.userAccount || !UserAccountService.validPassword(password, user.userAccount)) {
      return Boom.unauthorized(`Authentication failed: Failed to validate  login credentials`)
    }
  
    const {id: userId, accountId, accountTypeId} = user

    const authToken = JWT.sign({
      userId,
      accountId,
      accountTypeId
    }, jwtSecret, {
      expiresIn: '2h'
    })

    delete user.userAccount

    return h.response(user)
    .header('Authorization', authToken)
    .header('Access-Control-Expose-Headers', 'Authorization') 
  }

  async reauthorizeLogin(request, h) {
    const {auth: {credentials}, params: {listingId = null}} = request;
    const {accountId, userId, accountTypeId} = credentials;
    const {User} = this.app.models

    const user = await User.findById(userId);

    const authToken = JWT.sign({
      userId,
      accountId,
      accountTypeId
    }, jwtSecret, {
      expiresIn: '1h'
    })
 
    return h.response(user)
      .header('Authorization', authToken)
      .header('Access-Control-Expose-Headers', 'Authorization') 
  }

  async signUp(request, h) {
    const {UserAccountService, UserService, EmailService} = this.app.services
    const {payload = {}} = request
    const {password, ...profile} = payload
    
    const [createdUser, created] = await UserService.create({...profile, isActive: false})

    if (created) {
     const userAccount = await UserAccountService.save(password, createdUser)
      createdUser.userAccount = userAccount
    }
    else {
      console.log('Account with email already exists')
      return h.response({
        accountTaken: true,
        message: 'Account with email address already exists',
        statudCode: 401
      }).code(401)
    }

    let success
    success = await UserAccountService.sendVerificationEmail(profile.email, createdUser)

    return h.response({success})
  }
}