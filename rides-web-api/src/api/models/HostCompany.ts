import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module HostCompany
 * @description HostCompany model
 */
export class HostCompany extends Model {
  static schema(app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: true
      },
      vatNumber: {
        type: Sequelize.STRING(25),
        field: 'vat_number',
        allowNull: true
      },
      registrationNumber: {
        type: Sequelize.STRING(25),
        field: 'registration_number',
        allowNull: true
      },
      insuranceProvider: {
        type: Sequelize.STRING(25),
        field: 'insurance_provider',
        allowNull: true
      },
      insurancePolicyNumber: {
        type: Sequelize.STRING(25),
        field: 'insurance_policy_number',
        allowNull: true
      },
      website: {
        type: Sequelize.STRING(25),
        field: 'website',
        allowNull: true
      },
      picture: {
        type: Sequelize.STRING(25),
        field: 'picture',
        allowNull: true
      },
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      hostId: {
        type: Sequelize.INTEGER,
        field: 'host_id',
        allowNull: false,
        references: {
          model: 'host',
          key: 'host_id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      hostCompanyAddressId: {
        type: Sequelize.INTEGER,
        field: 'host_company_address_id',
        allowNull: true,
        references: {
          model: 'host_company_address',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'host_company',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Host, HostCompany, HostCompanyAddress} = models

    HostCompany.belongsTo(Host, {
      as: 'host',
      foreignKey: 'hostId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    HostCompany.belongsTo(HostCompanyAddress, {
      as: 'hostCompanyAddress',
      foreignKey: 'hostCompanyAddressId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

  }
}