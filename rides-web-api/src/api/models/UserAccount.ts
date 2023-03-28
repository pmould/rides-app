import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module FacebookAccount
 * @description Store user facebook account details
 */
export class UserAccount extends Model {

  static schema(app, Sequelize) {
    return {
      password: {type: Sequelize.STRING, field: 'password'},
      passwordSalt: {type: Sequelize.STRING, field: 'password_salt'},
      passwordHashAlgoirthm: {type: Sequelize.STRING, field: 'password_hash_algoirthm', allowNull: true},
      passwordReminderToken: {type: Sequelize.STRING, field: 'password_reminder_token', allowNull: true},
      confirmationEmailToken: {type: Sequelize.STRING, field: 'confirmation_email_token', allowNull: true},
      passwordReminderExpire:  {type: Sequelize.STRING, field: 'password_reminder_expire', allowNull: true},
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        field: 'user_id'
      },
      createdAt: {type: Sequelize.DATE, allowNull: false, field: 'created_at'},
      updatedAt: {type: Sequelize.DATE, allowNull: false, field: 'updated_at'}
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
          schema: 'public',
          tableName: 'user_account'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {UserAccount, User} = models
  }
}
