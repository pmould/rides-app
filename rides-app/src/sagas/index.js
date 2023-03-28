import * as userSagas from './user';
const sagasObject = {
  ...userSagas
};

const sagas = Object.keys(sagasObject)
  .reduce((acc, x, i) =>
    typeof sagasObject[x] === 'function' ? sagasObject[x]() : acc
  , []);

export default function* rootSaga() {
  console.log('sagas', sagas);
  yield sagas;
}