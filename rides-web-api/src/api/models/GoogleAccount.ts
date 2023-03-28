import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module GoogleAccount
 * @description Store user facebook account details
 */
export class GoogleAccount extends Model {

  static schema(app, Sequelize) {
    return {
      googleId: {type: Sequelize.STRING, allowNull: false, field: 'google_id'},
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
    const {GoogleAccount, User} = models

    GoogleAccount.belongsTo(User, {
      as: 'googleAccount',
      foreignKey: 'user_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  }
}
