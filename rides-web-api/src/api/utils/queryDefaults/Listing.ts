import Sequelize, {Op} from 'sequelize';

export const Listing = {
  default: (app) => {
    const listingAssociations = app.models['Listing'].instance.associations
    const vehicleAssociations = app.models['Vehicle'].instance.associations
    const listingLocAssociations = app.models['ListingLocation'].instance.associations
    const hostAssociation = app.models['Account'].instance.associations
    return {
      include: [
        listingAssociations.registerListingState,
        {
          association: listingAssociations.host,
          include: hostAssociation.accountUser
        },
        {
          association: listingAssociations.vehicle,
          include: [
            vehicleAssociations.make,
            vehicleAssociations.model,
            vehicleAssociations.vehicleRegistration
          ]
        },
         listingAssociations.listingPhotos,
        {
          association: listingAssociations.listingLocation,
          include: [
              listingLocAssociations.ghCityArea,
              listingLocAssociations.ghRegionArea,
              listingLocAssociations.ghPostCodeRegion,
              listingLocAssociations.ghMajorCity
          ]
        }
      ],
      where: {
        isActive: true
      }
    }   
  },
  default_search_listing_by_gh_location: (app, accountId,  ghPostCodeRegionId, ghRegionAreaId, ghCityId, ghCityAreaId) => {
    const associations = app.models['Listing'].instance.associations;
    const hostAssociations = app.models['Account'].instance.associations;
    const vehicleAssociations = app.models['Vehicle'].instance.associations;
    const listingLocationAssociations = app.models['ListingLocation'].instance.associations;

    let listingLocationWhere = {};
    let regionLocationWhere = {};
    if (ghPostCodeRegionId) {
      regionLocationWhere = {
        [Op.or]: [
          {
            '$listingLocation.ghMajorCity.gh_post_code_region_id$' : ghPostCodeRegionId
          },
          {
            '$listingLocation.gh_post_code_region_id$' : ghPostCodeRegionId
          }
        ]
      }
    }

    if (ghRegionAreaId) {
      listingLocationWhere['ghRegionAreaId'] = ghCityId
    }
    if (ghCityId) {
      listingLocationWhere['ghCityId'] = ghCityId
    }
    if (ghCityAreaId) {
      listingLocationWhere['ghCityAreaId'] = ghCityAreaId
    }

    let accountWhereClause = {};
    if (accountId) {
      accountWhereClause = {
        hostId: {
          [Op.ne]: accountId 
        }
      };

    }

    // let queryWhereObject = {};
    // let queryWhereParts = {...regionLocationWhere};
    
    // if ((Reflect.ownKeys(queryWhereParts).length !== 0)) {
    //   queryWhereObject = {
    //     where: queryWhereParts
    //   }
    // }

    return {
      where: {
        published: true,
        isActive: true,
        ...accountWhereClause,
        ...regionLocationWhere
      },
      include: [
        {
          association: associations.host,
          include: hostAssociations.accountUser
        },
        {
          association: associations.vehicle,
          include: [
            vehicleAssociations.make,
            vehicleAssociations.model
          ]
        },
        {
          association: associations.listingLocation,
          where: listingLocationWhere,
          include: [
            {
              association: listingLocationAssociations.ghMajorCity
            }
          ]
        },
        associations.listingPhotos
      ]
    }
  },
  default_listing_location: (app) => {
    const listLocAssociations = app.models['ListingLocation'].instance.associations
    return {
      association: app.models['Listing'].instance.associations.listingLocation,
      include: listingLocationIncludes(app)
    }
  }
}

export const listingLocationIncludes = (app) => {
  const listLocAssociations = app.models['ListingLocation'].instance.associations
  return [
    {
      association: listLocAssociations.ghCityArea
    },
    {
      association: listLocAssociations.ghRegionArea
    },
    {
      association: listLocAssociations.ghPostCodeRegion
    },
    {
      association: listLocAssociations.ghMajorCity
    }
  ]
}