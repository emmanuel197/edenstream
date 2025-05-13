import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slice/accountSlice";
import AuthReducer from "./slice/authSlice";
import drawerSlice from "./slice/drawerSlice";
import genreTabSlice from "./slice/genreTabSlice";
import inputSlice from "./slice/inputSlice";
import FetchMovies from "./slice/moviesSlice";
import fetchPackages from "./slice/subscriptionSlice"
import formReducer from './slice/formSlice';
import contentPrefSlice from './slice/contentPrefSlice';
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    fetchMovies: FetchMovies,
    drawer: drawerSlice,
    account: accountSlice,
    genreTab: genreTabSlice,
    input: inputSlice,
    fetchPackages: fetchPackages,
    form: formReducer,
    contentPref: contentPrefSlice,
  }
});
