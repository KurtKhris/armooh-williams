import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import postsReducer from "./postsSlice";
import eventsReducer from "./eventsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    posts: postsReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
