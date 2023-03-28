import {FabrixService as Service} from '@fabrix/fabrix/dist/common'
/**
 * @module HostCompanyService
 * @description TODO document Service
 */
export class HostCompanyService extends Service {
  async getById(hostId) {
   const {HostCompany, HostCompanyAddress} = this.app.models
   const hostCompany =  await HostCompany.find({
     where: {hostId}
   })
  }

  async save(hostCompany) {
    const {id, hostCompanyAddress} = hostCompany
    const {HostCompany, HostCompanyAddress} = this.app.models

    const savedHostCompanyAddress = await HostCompanyAddress.create({hostCompanyAddress})
    const {dataValues: {id: hostCompanyAddressId}} = savedHostCompanyAddress

    // Associate address with host company
    hostCompany.hostCompanyAddressId = hostCompanyAddressId

    const result = await HostCompany.update(hostCompany, {
      where: {id},
      returning: true
    })
    const {dataValues: savedHostCompany} = result[1][0]
    savedHostCompany.hostCompanyAddress = savedHostCompanyAddress

    return savedHostCompany

  }
}

