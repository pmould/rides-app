import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module StateType
 * @description StateType model
 */
export class StateType extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
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
        tableName: 'state_type',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {State, StateType} = models

    StateType.hasMany(State, {
        as: 'state',
        foreignKey: 'stateTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
  }
}
