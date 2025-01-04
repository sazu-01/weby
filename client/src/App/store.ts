
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/authSlice'
import websiteReducer from "../Features/websiteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    website : websiteReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch