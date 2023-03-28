

export const createOrUpdate = async (Model, item) => {
  if (item) {
    return
  }

  const {id} = item

  if (id) {
    // FIXME: Typescript Errors
    // return Model.update(vehicleRegistration, {
    //   where: {id}
    // })
  }
  else {
    // FIXME: Typescript Errors
    // return Model.create(newItem)
  }
}

export const groupItems = (list, itemKey = 'id') => {
  if(!Array.isArray(list)) {
      return
  }
  const obj = {}
  list.forEach(item => {
    const key = item[itemKey]
    obj[key] = obj[key] || []
    const group = obj[key]

    group.push(item)
  })

  return obj
}

// wrapper.js

export const asyncWrap = promise => (
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ error, data: null }))
);




