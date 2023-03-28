import {Listing as ListingQuery} from './Listing';

export const Account = {
  default: (app, accountId) => {
    const accountAssociations = app.models['Account'].instance.associations
    return {
      include: [
        {
          association: accountAssociations.accountUser
        },
        {
          association: accountAssociations.accountListings,
          include: ListingQuery.default(app).include,
          where: {
            published: true
          }
        }
      ]
    };
  }
}