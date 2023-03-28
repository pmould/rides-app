import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module MessageType
 * @description MessageType model
 */
export class MessageType extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      messageType: {
        type: Sequelize.STRING,
        field: 'messageType'
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
        tableName: 'message_type'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Message, MessageType} = models
    MessageType.hasMany(Message, {
      as: 'messages',
      foreignKey: 'messageId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
  }
}
