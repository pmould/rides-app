import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

export class User extends Model {
  static schema(app, Sequelize) {
    return {

    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: '',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {

  }
}