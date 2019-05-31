import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import sagas from '../sagas';
import omit from 'lodash/omit';

// reducers
import {
  online,
  user,
} from '../reducers';

const blacklist = ['user.error', 'online'];
const rootPersistConfig = {
  key: 'root',
  // when importing storage the interface type definitions are lost
  // had to set type 'any'
  storage: <any>storage,
  stateReconciler: autoMergeLevel2,
  blacklist,
  transforms: [
    // use a custom blacklist transform, so that we can blacklist nested paths
    createTransform(
      (inboundState, key) => {
        if (blacklist.indexOf(key) != -1) return {};
        const blacklist_forKey = blacklist
          .filter(path => path.startsWith(`${key}.`))
          .map(path => path.substr(key.length + 1));
        return blacklist_forKey.length
          ? omit(inboundState, ...blacklist_forKey)
          : inboundState;
      },
      (outboundState, key) => {
        return outboundState;
      }
    )
  ]
};

const rootReducer = combineReducers({
  online,
  user,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// see site for explanation of (<any>window)
// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
const composeEnhancers =
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
sagaMiddleware.run(sagas);
let persistor = persistStore(store);

export { store, persistor };