import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
import { initialState as UserInitialState } from "./user/userReducer";
import UserReducer from "./user/userReducer";

//Persist

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["User"],
};

// const userPersistConfig = {
//   key: "User",
//   storage: storage,
//   blacklist: ["authenticated"],
// };

const reducer = combineReducers({
  // User: persistReducer(userPersistConfig, UserReducer),
  User: UserReducer,
});

const initialState = {
  User: UserInitialState,
};

const persistedReducer = persistReducer(persistConfig, reducer);

//Temp removed logger
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)) //new way for ReduxDevTools
);

export const persistor = persistStore(store);
