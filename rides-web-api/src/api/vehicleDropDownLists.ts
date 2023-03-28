const {vehicleTypes: vehicleTypesEnum, odometerOptions: odometerOptionsEnum} = require('./constants/Enums')

const vehicleTypeKeys = Object.keys(vehicleTypesEnum)
export const vehicleTypes = [
  {label: "Car", value: vehicleTypesEnum.CAR},
  {label: "SUV", value: vehicleTypesEnum.SUV},
  {label: "Minivan", value: vehicleTypesEnum.MINIVAN},
  {label: "Truck", value: vehicleTypesEnum.TRUCK},
  {label: "Van", value: vehicleTypesEnum.VAN}
]

const odoOptKeys = Object.keys(odometerOptionsEnum)
export const odometerOptions = [
  {label: "0-80k kilometers", value: odoOptKeys[odometerOptionsEnum.ZERO_TO_EIGHTY_THOUSAND_KILOMETERS]},
  {label: "80k-160k kilometers", value: odoOptKeys[odometerOptionsEnum.EIGHTY_THOUSAND_TO_ONE_HUNDRED_SIXTY_THOUSAND_KILOMETERS]},
  {label: "160k-200k kilometers", value: odoOptKeys[odometerOptionsEnum.ONE_HUNDRED_SIXTY_THOUSAND_TO_TWO_HUNDRED_KILOMETERS]},
  {label: "200k+ kilometers", value: odoOptKeys[odometerOptionsEnum.OVER_TWO_HUNDRED_THOUSAND_KILOMETERS]}
]

export const marketValues = [
  {label: "$0 - $5,000", value: {amount: 2500, currencyCode: "USD"}},
  {label: "$5,000 - $10,000", value: {amount: 7500, currencyCode: "USD"}},
  {label: "$10,000 - $15,000", value: {amount: 12500, currencyCode: "USD"}},
  {label: "$15,000 - $20,000", value: {amount: 17500, currencyCode: "USD"}},
  {label: "$20,000 - $30,000", value: {amount: 25000, currencyCode: "USD"}},
  {label: "$30,000 - $55,000", value: {amount: 42500, currencyCode: "USD"}},
  {label: "$55,000 - $85,000", value: {amount: 70000, currencyCode: "USD"}},
  {label: "More than $85,000", value: {amount: 85000, currencyCode: "USD"}}
]
