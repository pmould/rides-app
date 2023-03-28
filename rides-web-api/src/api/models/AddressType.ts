import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

export class AddressType extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
      }
    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'address_type',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {AddressType, CompanyAddress, Company} = models
    AddressType.hasMany(CompanyAddress, {
      as: 'companyAddresses',
      foreignKey: 'addressTypeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AddressType.belongsToMany(Company, {
      as: 'companies',
      through: CompanyAddress,
      foreignKey: 'addressTypeId',
      otherKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
