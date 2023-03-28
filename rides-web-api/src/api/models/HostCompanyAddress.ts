import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module HostCompanyAddress
 * @description HostCompanyAddress model
 */
export class HostCompanyAddress extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      address: {
        type: Sequelize.STRING,
        field: 'address',
        allowNull: true
      },
      ghPostalCode: {
        type: Sequelize.STRING,
        field: 'gh_postal_code',
        allowNull: true
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
      options: {
        schema: 'public',
        tableName: 'host_company_address',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  
  static associate(models) {
    const {HostCompanyAddress, HostCompany, Host} = models

    HostCompanyAddress.hasOne(HostCompany, {
      as: 'hostCompany',
      foreignKey: 'hostCompanyAddressId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
    // Determine if this relation is needed

    // HostCompanyAddress.belongsTo(Host, {
    //     as: 'host',
    //     through: HostCompany,
    //     foreignKey: 'hostCompanyAddressId',
    //     otherKey: 'hostId',
    //     onDelete: 'NO ACTION',
    //     onUpdate: 'NO ACTION'
    // })   
  }
}
