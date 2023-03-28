import {FabrixService as Service} from '@fabrix/fabrix/dist/common'
import {Listing as ListingQuery} from '../utils/queryDefaults/Listing'

const {dailyRate} = require('../constants')
const {createOrUpdate} = require('../utils')

import {registerListingState} from '../constants/Enums';

/**
 * @module ListingService
 * @description Listing Service
 */
export class ListingService extends Service {
  async create(unSavedListing) {
    const {Listing, ListingLocation, Vehicle} = this.app.models

    const {id, vehicle, listingLocation} = unSavedListing
    let listingId = id;
    if(!id) {
      const listing = await Listing.create({...unSavedListing, dailyRate, registerListingStateId: registerListingState.CUSTOM}, {
        include: [
          Listing.instance.associations.vehicle,
          Listing.instance.associations.listingLocation
        ]
      })
      listingId = listing.id;
    }
    else {
      if(vehicle) {
        const {id: vehicleId, modelYear, makeId, modelId, vehicleTypeId, manual, odometerReadingEstimate, marketValueEstimate} = vehicle
        const [count, updatedVehicleList] = await Vehicle.update({
          modelYear, makeId, modelId, vehicleTypeId, manual, odometerReadingEstimate, marketValueEstimate
        },
        {
          where: {id: vehicleId},
          returning: true
        })

        const updatedVehicle = updatedVehicleList.length && updatedVehicleList[0]
        if (updatedVehicle) {
          unSavedListing.vehicle = updatedVehicleList
        }
      }

      if (listingLocation) {
        const {id} = listingLocation
        const [count, updatedListingLocationList] = await ListingLocation.update(listingLocation, {
          where: {id},
          returning: true
        })
      }
    }

    return Listing.findByIdDefault(listingId);
  }

  async save(id, listingPatch) {
    const {Listing, ListingLocation, Vehicle, VehicleRegistration} = this.app.models
    const {vehicle = null, vehicleRegistration = null, listingLocation} = listingPatch

    const listingInstance = await Listing.findByIdDefault(id);

    const vehicleInstance = listingInstance.vehicle

    let vehicleRegistrationInstance = vehicleInstance.vehicleRegistration
    let updatedVehicleRegistration
    let updatedListingLocation

    // create or update vehicleRegistration
    if (vehicleRegistration) {
      const vehicleRegistrationInstance = vehicleInstance.vehicleRegistration
      if(vehicleRegistrationInstance) {
        const {id} = vehicleRegistrationInstance
        const [count, updatedVehRegList] = await VehicleRegistration.update(vehicleRegistration, {
          where: {id},
          returning: true
        })
        updatedVehicleRegistration = count && updatedVehRegList[0]
      }
      else {
        updatedVehicleRegistration = await VehicleRegistration.create(vehicleRegistration)
        await vehicleInstance.setVehicleRegistration(updatedVehicleRegistration)
      }
    }

    if(listingLocation) {
      const listingLocationInstance = listingInstance.listingLocation
      if(listingLocationInstance) {
        const {id} = listingLocationInstance
        const [count, updatedListingLocationList] = await ListingLocation.update(listingLocation, {
          where: {id},
          returning: true
        })
        updatedListingLocation = count && updatedListingLocationList[0]
        listingInstance.dataValues.listingLocation = updatedListingLocation
      }
      else {
        updatedListingLocation = await ListingLocation.create(listingLocation)
        console.log('updatedlistingLocation', updatedListingLocation)
        await listingInstance.setListingLocation(updatedListingLocation)
      }
    }

    await listingInstance.update(listingPatch)

    return Listing.findByIdDefault(id);
  }

  async getById(id) {
    const {Listing, ListingLocation, Vehicle, VehicleRegistration} = this.app.models
    const listing = await Listing.findByIdDefault(id);

    const listingResponse = listing.toJSON();
    // listingResponse.vehicleRegistration = listingResponse.vehicle.vehicleRegistration
    // listingResponse.photos = listingResponse.listingPhotos
    // delete listingResponse.listingPhotos
    // delete listingResponse.vehicle.vehicleRegistration
    // delete listingResponse.vehicle.vehicleRegistration
    // return listingResponse
  }

  async getAll(accountId) {
    const {Listing, ListingLocation, Vehicle, VehicleRegistration} = this.app.models
  
    const listings = await Listing.findAllDefault({
      where: {hostId: accountId}
    })

    return listings;
  }

  async publish(id) {
    const {Listing} = this.app.models

    // TODO: Add logic to validate listing before publishing
    await Listing.update({
      published: true,
      registerListingStateId: registerListingState.PUBLISHED
    }, {
      where: {id}
    })
  }

  async delete(id) {
    const {Listing} = this.app.models

    await Listing.update({
      isActive: false
    }, {
      where: {id}
    })
  }

  async getSearchListings(query, accountId) {
    const {ghPostCodeRegionId, ghRegionAreaId, ghCityId, ghCityAreaId} = query
    const {Listing} = this.app.models
    const listingLocationWhere: any  = {}
    if (ghCityId) {
      listingLocationWhere.ghCityId = ghCityId
    }
    if (ghPostCodeRegionId) {
      listingLocationWhere.ghPostCodeRegionId = ghPostCodeRegionId
    }

    const listings = await Listing.findAll(
      ListingQuery.default_search_listing_by_gh_location(this.app, accountId, ghPostCodeRegionId, ghRegionAreaId, ghCityId, ghCityAreaId)
    )

    // const listings =  foundListings.map(listing => {
    //   const listingResponse = listing.toJSON()
    //   listingResponse.photos = listingResponse.listingPhotos
    //   delete listingResponse.listingPhotos;
    //   const host = listingResponse.host;
    //   const {createdAt = '', updatedAt = '', ...userDisplayProps} = host && host.accountUser && host.accountUser[0] || {}
    //   listingResponse.host = {...listingResponse.host, ...userDisplayProps}
    //   delete listingResponse.host.accountUser;
    //   return listingResponse
    // })

    return {
      listings
    }
  }
}
