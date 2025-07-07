import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainReducer } from './gameReducer';

export const store = createStore(mainReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
