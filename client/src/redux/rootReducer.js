import { combineReducers } from 'redux';
// slices
import networkReducer from './slices/network';
import userReducer from './slices/user';
import tokenListingReducer from './slices/tokenListing';
import poolsReducer from './slices/pools';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  user: userReducer,
  network:networkReducer,
  tokenListing:tokenListingReducer,
  pools:poolsReducer
});

export { rootReducer };
