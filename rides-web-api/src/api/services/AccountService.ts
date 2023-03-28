import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module AccountService
 * @description Account
 */
export class AccountService extends Service {
  async save(userId, newAccount) {
    const {Account, User} = this.app.models
    //const {accountTypeId} = newAccount
    // const account = await Account.create(newAccount)
    // const account = await Account.findOrCreate({
    //   where: {email},
    //   defaults: newAccount,

    // })

    const account = await Account.create(newAccount);
    const {id: accountId, accountTypeId} = account.dataValues

    await User.update(
      {accountId, accountTypeId},
      {
        where: {id: userId}
      }
    )

    return await this.getById(accountId)
  }

  async update(accountId, account) {
    const {Account} = this.app.models

    const [count, updatedAccount] = await Account.update(
      account,
      {
        where: {id: accountId},
        returning: true
      }
    )

    return updatedAccount.length && updatedAccount[0]
  }

  async getById(accountId) {
    const {Account} = this.app.models

    return Account.findById(accountId)
  }

}

