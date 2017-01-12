import { get, map, reduce } from 'lodash/fp';
import { combineReducers } from 'redux';
import qs from 'qs';
import * as actions from './actions';

const collectionKey = params => qs.stringify(params) || 'root';

// const collectionsItem = (state = {}, { type, payload }) => {
//   switch (type) {
//     default:
//       return state;
//   }
// };

const collections = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.fetchCollection.types.initiate: {
      const key = collectionKey(payload.params);

      if (!state[key]) {
        return {
          ...state,
          [key]: {
            ids: [],
            loading: true,
            params: payload.params,
            timestamp: new Date().toString(),
          },
        };
      }
      return {
        ...state,
        [key]: {
          ...state[key],
          loading: true,
          timestamp: new Date().toString(),
        },
      };
    }

    case actions.fetchCollection.types.succeed:
      return {
        ...state,
        [collectionKey(payload.params)]: {
          ...state[collectionKey(payload.params)],
          ids: map(get('id'), payload.records),
          loading: false,
          pagination: payload.pagination,
          timestamp: new Date().toString(),
        },
      };

    default:
      return state;
  }
};

// const recordsItem = (state = {}, { type, payload }) => {
//   switch (type) {
//     default:
//       return state;
//   }
// };

const records = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
      return {
        ...state,
        [payload.id]: payload,
      };

    case actions.fetchCollection.types.succeed:
      return {
        ...state,
        ...reduce(
          (acc, el) => ({ ...acc, [el.id]: el }),
          {},
          payload.records,
        ),
      };
    default:
      return state;
  }
};

export default combineReducers({
  collections,
  records,
});
