import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

export class Company extends Model {
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
        type: Sequelize.INTEGER,
        field: 'name',
        allowNull: false
      },
      companyAddressId: {
        type: Sequelize.INTEGER,
        field: 'company_address_id',
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        field: 'created_at',
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        field: 'updated_at',
        allowNull: true
      },
      vatNumber: {
        type: Sequelize.STRING,
        field: 'vat_number',
        allowNull: true
      },
      registrationNumber: {
        type: Sequelize.STRING,
        field: 'registration_number',
        allowNull: true
      },
      insuranceProvider: {
        type: Sequelize.STRING,
        field: 'insurance_provider',
        allowNull: true
      },
      insurancePolicyNumber: {
        type: Sequelize.STRING,
        field: 'insurance_policy_number',
        allowNull: true
      },
      website: {
        type: Sequelize.STRING,
        field: 'website',
        allowNull: true
      },
      picture: {
        type: Sequelize.STRING,
        field: 'picture',
        allowNull: true
      }
    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'company',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {Company, CompanyAddress, User, AddressType, Host} = models

    Company.hasMany(CompanyAddress, {
      as: 'companyAddresses',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    Company.hasMany(User, {
        as: 'CompanyUsers',
        foreignKey: 'companyId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Company.belongsToMany(AddressType, {
        as: 'addressTypes',
        through: CompanyAddress,
        foreignKey: 'id',
        otherKey: 'addressTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}

