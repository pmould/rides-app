import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module State
 * @description State model
 */
export class State extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      stateTypeId: {
        type: Sequelize.INTEGER,
        field: 'state_type_id',
        allowNull: false,
        references: {
          model: 'state_type',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      nextStateId: {
        type: Sequelize.INTEGER,
        field: 'next_state_id',
      },
      name: {
        type: Sequelize.STRING,
        field: 'name'
      },
      description: {
        type: Sequelize.STRING,
        field: 'description'
      }
    }
  }
  
  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'state',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {State, StateType} = models

    State.belongsTo(StateType, {
        as: 'stateType',
        foreignKey: 'state_type_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
  }
}
