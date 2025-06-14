import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import conditionReducer from "./conditionsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    conditions: conditionReducer
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
