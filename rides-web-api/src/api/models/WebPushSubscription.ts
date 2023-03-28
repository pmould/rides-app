import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'
import {Op, Sequelize} from 'sequelize';

export class WebPushSubscriptionResolver extends SequelizeResolver {

}

/**
 * @module WebPushSubscription
 * @description WebPushSubscription model
 */
export class WebPushSubscription extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.STRING,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      browser: {
        type: Sequelize.STRING,
        field: 'browser',
        allowNull: false
      },
      subscription: {
        type: Sequelize.JSONB,
        field: 'subscription',
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        allowNull: false
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'web_push_subscription',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return WebPushSubscriptionResolver
  }

  static associate(models) {
    const {WebPushSubscription, User} = models

    WebPushSubscription.belongsTo(User, {
      as: 'user',
      foreignKey: 'user_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
