import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import postsReducer from "~/components/Profile/postSlice";
import usersReducer from "~/components/Profile/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
