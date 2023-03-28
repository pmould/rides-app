import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module Message
 * @description Message model
 */
export class MessageTopic extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      namespace: {
        type: Sequelize.STRING,
        field: 'namespace'
      },
      room: {
        type: Sequelize.STRING,
        field: 'room',
      },
      createdByUserId: {
        type: Sequelize.STRING,
        field: 'created_by_user_id'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: true
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      migrate: 'drop',
      options: {
        schema: 'public',
        tableName: 'message_topic'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Message, MessageTopic, MessageReceipt} = models
    MessageTopic.hasMany(Message, {
      as: 'messageTopicMessages',
      foreignKey: 'messageId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
