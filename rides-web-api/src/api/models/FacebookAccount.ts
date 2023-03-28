import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module FacebookAccount
 * @description Store user facebook account details
 */
export class FacebookAccount extends Model {

  static schema(app, Sequelize) {
    return {
      facebookId: {type: Sequelize.STRING, allowNull: false, field: 'facebook_id'},
      picture: {type: Sequelize.STRING},
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
      store: 'postgresSequelize'
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {FacebookAccount, User} = models

    FacebookAccount.belongsTo(User, {
      as: 'facebookAccount',
      foreignKey: 'user_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  }
}
