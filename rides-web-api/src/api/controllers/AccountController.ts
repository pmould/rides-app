'use strict'

import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'

import {Account as AccountQuery} from '../utils/queryDefaults/Account';

const JWT = require('jsonwebtoken')

const {jwtSecret} = require('../constants')

/**
 * @module AccountController
 * @description Host.
 */
export class AccountController extends Controller {
  async saveNewAccount(request, h) {
    const {payload: newAccount, auth: {credentials: {userId}}} = request
    const {AccountService} = this.app.services

    const account = await AccountService.save(userId, newAccount)
    const {id: accountId, accountTypeId} = account

    const authToken = JWT.sign({
      userId,
      accountId,
      accountTypeId
    }, jwtSecret, {
        expiresIn: '2h'
      })

    return h.response(account)
      .header('Authorization', authToken)
      .header('Access-Control-Expose-Headers', 'Authorization')
  }

  async updateAccount(request, h) {
    const {payload: unSavedAccount, auth: {credentials: {userId, accountId}}} = request
    const {AccountService} = this.app.services

    const account = await AccountService.update(accountId, unSavedAccount)

    return account
  }

  async getUserProfile(request, h) {
    const {auth: {credentials: {accountId}}} = request;

    const {Account} = this.app.models;
  const defaultQuery = AccountQuery.default(this.app, accountId);

    const account = await Account.findById(accountId, {...defaultQuery});

    return account;
  }
  
  async getProfile(request, h) {
    const {params: {profileAccountId}} = request;

    const {Account} = this.app.models;
  const defaultQuery = AccountQuery.default(this.app, profileAccountId);

    const account = await Account.findById(profileAccountId, {...defaultQuery});

    return account;
  }
}

