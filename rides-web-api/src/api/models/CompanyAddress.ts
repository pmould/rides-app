import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleMake
 * @description VehicleMake model
 */
export class CompanyAddress extends Model {

  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'company',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      addressId: {
        type: Sequelize.INTEGER,
        field: 'addressId',
        allowNull: false
      },
      addressTypeId: {
        type: Sequelize.INTEGER,
        field: 'addressTypeId',
        allowNull: false,
        references: {
          model: 'addressType',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      }
    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'company_address',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {CompanyAddress, AddressType, Company} = models

    CompanyAddress.belongsTo(AddressType, {
      as: 'addressType',
      foreignKey: 'addressTypeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    CompanyAddress.belongsTo(Company, {
      as: 'company',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
