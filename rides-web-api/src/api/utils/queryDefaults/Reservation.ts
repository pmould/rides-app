const sequilize = require('sequelize')

export const Reservation = {
  default: (app) => {
    const associations = app.models['Reservation'].instance.associations
    const accountAssociations = app.models['Account'].instance.associations
    const listingAssociations = app.models['Listing'].instance.associations
    const listLocAssociations = app.models['ListingLocation'].instance.associations
    const vehicleAssociations = app.models['Vehicle'].instance.associations

    return {
      include: [
        {
          association: associations.tripPhotos,
          // TODO: Figure out why ordering is not working for assocciations
          order: sequilize.col('id')
        },
        {
          association: associations.reservationDriver,
          include: [
            {
              association: accountAssociations.accountUser,
              duplicating: false,
              required: true
            }
          ],
          duplicating: false,
          required: true
        },
        {
          association: associations.reservationVehicle,
          include: [
            {
              association: vehicleAssociations.model,
              duplicating: false
            },
            {
              association: vehicleAssociations.make,
              duplicating: false
            }  
          ],
          duplicating: false,
          required: true
        },
        {
          association: associations.reservationListing,
          include: [
            {
              association: listingAssociations.host,
              include: [
                {
                  association: accountAssociations.accountUser,
                  duplicating: false,
                  required: true
                }
              ],
              duplicating: false,
              required: true
            },
            {
              association: listingAssociations.listingPhotos,
              duplicating: false
            },
            {
              association: listingAssociations.listingLocation,
              include: [
                listLocAssociations.ghCityArea,
                listLocAssociations.ghRegionArea,
                listLocAssociations.ghPostCodeRegion,
                listLocAssociations.ghMajorCity
              ],
              duplicating: false
            }
          ],
          duplicating: false,
          required: true
        }
      ]
    }
  }
}