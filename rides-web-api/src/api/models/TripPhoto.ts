import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'

export class TripPhotoResolver extends SequelizeResolver {
  async update(tripPhotoPayload) {
    const {TripPhoto} = this.app.models;
    const tripPhoto = await TripPhoto.findById(tripPhotoPayload.id);

    if (!tripPhoto) return;
    await tripPhoto.update(tripPhotoPayload);

    return tripPhoto;
  }
}
/**
 * @module TripPhoto
 * @description TripPhoto model
 */
export class TripPhoto extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      reservationId: {
        type: Sequelize.INTEGER,
        field: 'reservation_id',
        allowNull: false,
        references: {
          model: 'reservation',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      accountId: {
        type: Sequelize.INTEGER,
        field: 'account_id',
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        field: 'url',
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
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
        tableName: 'trip_photo'
      }
    }
  }

  static get resolver() {
    return TripPhotoResolver;
  }

  static associate(models) {
    const {TripPhoto, Reservation} = models

    TripPhoto.belongsTo(Reservation, {
      as: 'TripPhotoReservation',
      foreignKey: 'reservationId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
