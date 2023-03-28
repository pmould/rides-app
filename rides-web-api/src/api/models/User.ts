import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

export class UserResolver extends SequelizeResolver {
  async findByUserAccountEmail(email) {
    const {User} = this.app.models;

    return User.findOne({
      where: {email},
      include: [{
        association: User.instance.associations.userAccount
      }, {
        association: User.instance.associations.account
      }]
    })
  }

  async findAllByAccountId(id) {
    const {User} = this.app.models
 
    return User.findById(id, {
      include: [User.instance.associations.account, User.instance.associations.webPushSubscriptions]
    });
  }

  async findByIdDefault(id) {
    const {User} = this.app.models
 
    return User.findById(id, {
      include: [User.instance.associations.account, User.instance.associations.webPushSubscriptions]
    })
  }

  async findByFacebookId(facebookId) {
    const {User} = this.app.models
  
    return User.findOne({
      include: [{   
        association: User.instance.associations.facebookAccount,
        where: {facebookId}
      }]
    })
  }

  async findByGoogleId(googleId) {
    const {User} = this.app.models
  
    return User.findOne({
      include: [{   
        association: User.instance.associations.googleAccount,
        where: {googleId}
      }]
    })
  }

  async findByEmail(email) {
    const {User} = this.app.models
  
    return User.findOne({
      where: {email},
      include: [
        User.instance.associations.account,
        User.instance.associations.facebookAccount,
        User.instance.associations.googleAccount,
      ]
    })
  }
}
/**
 * @module User
 * @description User model
 */
export class User extends Model {
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
      coverPhoto: {
          type: Sequelize.STRING(255),
          field: 'cover_photo',
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
      aboutText: {
          type: Sequelize.STRING(255),
          field: 'about_text',
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
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        allowNull: true
      }
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'user'
      }
    }
  }
   
  static get resolver() {
    return UserResolver
  }
 
  static associate(models) {
    const {User, WebPushSubscription, FacebookAccount, GoogleAccount, Company, Account, UserAccount, AccountType} = models

    User.hasMany(WebPushSubscription, {
      as: 'webPushSubscriptions',
      foreignKey: 'userId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    User.hasOne(FacebookAccount, {
        as: 'facebookAccount',
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    User.hasOne(GoogleAccount, {
      as: 'googleAccount',
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })

    User.hasOne(UserAccount, {
      as: 'userAccount',
      foreignKey: 'userId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })  

    // User.belongsTo(Company, {
    //     as: 'company',
    //     foreignKey: 'companyId',
    //     onDelete: 'NO ACTION',
    //     onUpdate: 'NO ACTION'
    // })

    User.belongsTo(Account, {
        as: 'account',
        foreignKey: 'accountId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    User.belongsTo(AccountType, {
        as: 'accountType',
        foreignKey: 'accountTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}