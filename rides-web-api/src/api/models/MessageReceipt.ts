import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module Message
 * @description Message model
 */
export class MessageReceipt extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      messageId: {
        type: Sequelize.INTEGER,
        field: 'messageId',
        references: {
          model: 'message',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
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
        tableName: 'message_receipt'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Message, MessageTopic, MessageReceipt} = models

    MessageTopic.hasMany(Message, {
      as: 'messageReceiptMessages',
      foreignKey: 'messageId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
  }
}
