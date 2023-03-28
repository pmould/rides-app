import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'

export class User extends Model {
  // More about supported schema here : http://docs.sequelizejs.com/en/latest/docs/models-definition/
  static schema (app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
          type: Sequelize.STRING(255),
          field: 'first_name',
          allowNull: false
      },
      lastName: {
          type: Sequelize.STRING(255),
          field: 'last_name',
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(255),
          field: 'email',
          allowNull: true
      },
      picture: {
          type: Sequelize.STRING(255),
          field: 'picture',
          allowNull: true
      },
      password: {
          type: Sequelize.STRING(255),
          field: 'password',
          allowNull: true
      },
      address: {
          type: Sequelize.STRING(255),
          field: 'address',
          allowNull: true
      },
      dob: {
          type: Sequelize.DATE,
          field: 'dob',
          allowNull: true
      },
      telephone: {
          type: Sequelize.STRING(255),
          field: 'telephone',
          allowNull: true
      },
      createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
      },
      title: {
          type: Sequelize.STRING,
          field: 'title',
          allowNull: true
      },
      tel1: {
          type: Sequelize.INTEGER,
          field: 'tel1',
          allowNull: true
      },
      accountId: {
          type: Sequelize.INTEGER,
          field: 'account_id',
          allowNull: true,
          references: {
              model: 'account',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      accountTypeId: {
          type: Sequelize.INTEGER,
          field: 'account_type_id',
          allowNull: true
      }
  }

  static config (app, Sequelize) {
    return {
       store: 'postgresSequelize',
       options: {}
     }
  }
  
  // The Way this model interacts with Sequelize
  static get resolver () {
    return SequelizeResolver
  }
  
  // If you need associations, put them here
  static associate(models) {
     // More information about associations here : http://docs.sequelizejs.com/en/latest/docs/associations/
     const {User, FacebookAccount, Company, Account, AccountType} = models;

     User.hasOne(FacebookAccount, {
         as: 'facebookAccount',
         foreignKey: 'userId',
         onDelete: 'SET NULL',
         onUpdate: 'CASCADE'
     });

     // User.belongsTo(Company, {
     //     as: 'company',
     //     foreignKey: 'companyId',
     //     onDelete: 'NO ACTION',
     //     onUpdate: 'NO ACTION'
     // });

     User.belongsTo(Account, {
         as: 'account',
         foreignKey: 'accountId',
         onDelete: 'NO ACTION',
         onUpdate: 'NO ACTION'
     });

     User.belongsTo(AccountType, {
         as: 'accountType',
         foreignKey: 'accountTypeId',
         onDelete: 'NO ACTION',
         onUpdate: 'NO ACTION'
     });
  }
}