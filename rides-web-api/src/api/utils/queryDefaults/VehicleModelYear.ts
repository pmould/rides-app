export const VehicleModelYear = {
  default: (app, makeId, year) => {
    const associations = app.models.VehicleModelYear.instance.associations
    return {
      include: [{
        association: associations.vehicleModel,
        required: true,
        where: {makeId}
      }],
      where: {year},
      order: [
        [associations.vehicleModel, 'model', 'ASC']
      ]
    }
  }
}