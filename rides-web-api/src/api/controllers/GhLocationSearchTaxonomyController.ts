'use strict'

const {groupItems} = require('../utils')
import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module GhLocationSearchTaxonomyController
 * @description TODO document Controller.
 */
export class GhLocationSearchTaxonomyController extends Controller {
  async get(request, h) {
    const {GhCityAreaService, GhRegionAreaService} = this.app.services

      // Set popular Cities
      const ghCityAreas = await GhCityAreaService.getAll()
      const popularCities = groupItems(ghCityAreas, 'majorCityId')
      this.setPopularAreas(popularCities)
      this.setCityGroupNames(popularCities)

      // Set popular Regions
      const ghRegionAreas = await GhRegionAreaService.getAll()
      const regions = groupItems(ghRegionAreas, 'ghPostCodeRegionId')
      this.setPopularAreas(regions)
      this.setRegionGroupNames(regions)

    return {
      popularCities,
      regions
    }
  }

  setPopularAreas(allAreas) {
    Object.keys(allAreas)
    .forEach((key) => {
      const item = allAreas[key]
      const popularAreas = []
      const areas = []

      item.forEach(area => {
        area.dataValues.label = area.area
        area.dataValues.value = area.id
        if (area.popular) {
          popularAreas.push(area)
        }
        else {
          areas.push(area)
        }
      })

      allAreas[key] = {
        list: {
          popularAreas,
          areas
        }
      }
    })
  }

  setCityGroupNames(allAreas) {
    Object.keys(allAreas)
    .forEach((key) => {
      const areaGroup =  allAreas[key]
      const areas = areaGroup.list && areaGroup.list.areas
      areaGroup.name = areas.length && areas[0].ghMajorCity && areas[0].ghMajorCity.city
    })
  }

  setRegionGroupNames(allAreas) {
    Object.keys(allAreas)
    .forEach((key) => {
      const areaGroup =  allAreas[key]
      const areas = areaGroup.list && areaGroup.list.areas
      areaGroup.name = areas.length && areas[0].ghPostCodeRegion && areas[0].ghPostCodeRegion.region
    })
  }
}


