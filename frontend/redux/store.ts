import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import catalogReducer from "./catalogSlice";
import postsReducer from "./postsSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    catalogs: catalogReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
