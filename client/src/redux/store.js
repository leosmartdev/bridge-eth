import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from './rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import thunk from "redux-thunk";
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'redrum',
  storage,
  blacklist: ['tokenListing','pools']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = (() => {
  // Create Store
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  // Persist Store
  const persistor = persistStore(store);

  const storePersist = {
    store,
    persistor,
  };
  return storePersist;
})();


const useSelector = useReduxSelector;

const useDispatch = () => useReduxDispatch();

export {store, useDispatch, useSelector};



