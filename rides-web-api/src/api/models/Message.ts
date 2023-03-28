import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module Message
 * @description Message model
 */
export class Message extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        field: 'payload'
      },
      mesageTypeId: {
        type: Sequelize.STRING,
        field: 'messageTypeId',
        references: {
          model: 'message_type',
          key: 'id',
        }
      },
      createdByUserId: {
        type: Sequelize.STRING,
        field: 'created_by_user_id'

      },
      messageTopicId: {
        type: Sequelize.INTEGER,
        field: 'message_topic_id',
        references: {
          model: 'message_topic',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
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
        tableName: 'message'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Message, MessageTopic, MessageReceipt} = models

    Message.belongsTo(MessageTopic, {
      as: 'messageTopic',
      foreignKey: 'messageTopicId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    Message.hasMany(MessageReceipt, {
      as: 'messageReceipts',
      foreignKey: 'messageReceiptId',
      otherKey: 'listingId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
