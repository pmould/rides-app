import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module UserService
 * @description services to save a user
 */
export class UserService extends Service {
 async create(profile) {
  const User = this.app.models.User

  const {first_name: firstName, last_name: lastName, email, picture: pictureDetails} = profile
  const picture = pictureDetails && pictureDetails.data && pictureDetails.data.url

  return await User.findOrCreate({
    where: {email},
    defaults: {firstName, lastName, picture}
  })
 }
 
 async get(userId) {
  const {User} = this.app.models

  return User.findOne({
    where: {id: userId},
    include: [User.instance.associations.account]
  })
 }
  
}

