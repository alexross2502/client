import { combineReducers } from "redux";
import modalWindowReducer from "./modalWindowReducer";
import authorizationReducer from "./authorizationReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rerenderReducer from "./rerenderReducer";
import orderReducer from "./orderReducer";
import modalMastersReducer from "./modalMastersReducer";
import { availableMastersReducer } from "./availableMastersReducer";
import { orderDataReducer } from "./orderDataReducer";
import orderSuccessReducer from "./orderSuccessReducer";
import { PersistConfig, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

import persistStore from "redux-persist/es/persistStore";
import modalAddMastersReducer from "./mastersReducer";
import modalAddReservationsReducer from "./reservationsReducer";
import modalAddClientsReducer from "./clientsReducer";
import modalAddTownsReducer from "./townsReducer";
import modalDeleteReducer from "./deleteReducer";
import RemoveAndAddModalReducer from "./RemoveAndAddModalReducer";
import RemoveAndAddModalErrorReducer from "./RemoveAndAddModalErrorReducer";

const rootReducer = combineReducers({
  modalWindow: modalWindowReducer,
  authorization: authorizationReducer,
  rerender: rerenderReducer,
  order: orderReducer,
  modalMasters: modalMastersReducer,
  availableMasters: availableMastersReducer,
  orderData: orderDataReducer,
  orderSuccess: orderSuccessReducer,
  addMaster: modalAddMastersReducer,
  addReservation: modalAddReservationsReducer,
  addClient: modalAddClientsReducer,
  addTown: modalAddTownsReducer,
  delete: modalDeleteReducer,
  removeAndAdd: RemoveAndAddModalReducer,
  removeAndAddError: RemoveAndAddModalErrorReducer,
});

const persistConfig = {
  key: "main-root",
  storage: sessionStorage,
  whitelist: ["authorization"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const Persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
