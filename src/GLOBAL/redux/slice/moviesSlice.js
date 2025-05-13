import { createSlice } from "@reduxjs/toolkit";

const fetchMovieSlice = createSlice({
  name: "fetchMovie",
  initialState: {
    movies: [],
    drama: [],
    action: [],
    family: [],
    // romance: [],
    upcoming: [],
    dramaCategory: [],
    actionCategory: [],
    comedyCategory: [],
    mostwatched: [],
    comingSoon: [],
    trending: [],
    bingeworthy: [],
    nostalgia: [],
    romcom: [],
    omg: [],
    readysetpopcorn: [],
    doubledrama: [],
    exciting: [],
    mtnrecommends: [],
    randompicks: [],
    suggestedmoviesforyou: [],
    topepicmovies: [],
    viewersfavourites: [],
    hiddengems: [],
    watchagain: [],
    afriplaytop10: [],
    afriPlaylive: [],
    afriPremiere: [],
    recentlyadded: [],
    nameToId: {},
    packageNameToId: {},
    moviesByCategories: {},
    genreCategories: {},
    movieDetails: [],
    watchlist: [],
    channelCategories: [],
    ageRatings: [],
    seriesInfo: {},
    dynamicBannerTrailer: "",
    selectedMovie: [],
    dataFromCache: false, // Track if data came from cache
    error: false,
    loading: false,
    loaders: {
      category: true,
      series: true,
      movies: true,
      movieVideo: true,
      seriesVideo: true,
      moreLikeThis: true,
      genreMovies: true,
      movieDetails: true,
      dynamicBanner: true
    }
  },

  reducers: {
    fetchAllSeriesReducer: (state, action) => {
      state.allSeries = action.payload;
    },
    fetchChannelCategoriesReducer: (state, action) => {
      state.channelCategories = action.payload;
    },
    fetchAgeRatingsReducer: (state, action) => {
      state.ageRatings = action.payload;
    },
    fetchSimilarMoviesReducer: (state, action) => {
      state.similarMovies = action.payload;
    },
    fetchWatchlistReducer: (state, action) => {
      state.watchlist = action.payload;
    },
    fetchGenresReducer: (state, action) => {
      state.genres = action.payload;
    },
    fetchOneSeriesReducer: (state, action) => {
      state.seriesInfo = action.payload;
      state.loaders.series = false;
    },
    fetchBannerTrailer: (state, action) => {
      state.dynamicBannerTrailer = action.payload;
    },
    fetchPackageMoviesReducer: (state, action) => {
      state.packageMovies = action.payload;
    },

   
    fetchMoviesByCategory: (state, action) => {
      const { category, movies } = action.payload;
      // console.log(movies);
      const categoryKey = category.toLowerCase() + "Category";
      // console.log(movies);
      state[categoryKey] = movies; // Dynamically set the category, no need to check existence.
      state.loaders.category = false;
    },
    setGenreCategories: (state, action) => {
      state.genreCategories = action.payload;
    },
    fetchMovies_begin: (state) => {
      state.loaders.movies = true;
      state.error = false;
    },

    
    fetchMovies_success: (state, action) => {
      // state.loading = true
      const {
        movies,
        packageNameToId,
        moviesByCategories,
        trending,
        recentlyadded,
        bingeworthy
      } = action.payload;
      // Reset state for all categories.
      // console.log(moviesByCategories)
      // Execute only when the location pathname is "/".
      if (window.location.pathname === "/") {
        state.trending = trending?.length > 0 ? trending : [];
        state.recentlyadded = recentlyadded?.length > 0 ? recentlyadded : [];
        state.bingeworthy = bingeworthy?.length > 0 ? bingeworthy : [];
      } else {
        const protectedCategories = ["drama", "comedy", "action"];
        
        // Populate state with new categorized movies.
        for (const [category, categoryMovies] of Object.entries(
          moviesByCategories
        )) {
          const categoryKey = category.toLowerCase();
          // console.log(categoryKey)
          if (state[categoryKey]) {
            state[categoryKey] =
              categoryMovies.length > 0 && categoryMovies[0]["content"]
                ? categoryMovies[0]["content"]
                : categoryMovies;
          }
        }
      }

      // General movies and mappings.
      // state.movies = movies || [];
      state.movies = movies?.length > 0 ? movies : [];
      state.packageNameToId = packageNameToId;
      state.moviesByCategories = moviesByCategories;
      state.loaders.movies = false;
    },
    fetchMovies_fromCache: (state, action) => {
      const {
        movies,
        packageNameToId,
        moviesByCategories,
        trending,
        recentlyadded,
        bingeworthy,
      } = action.payload;

      // Same logic as `fetchMovies_success`, but mark data as cached
      if (window.location.pathname === '/') {
        state.trending = trending?.length > 0 ? trending : [];
        state.recentlyadded = recentlyadded?.length > 0 ? recentlyadded : [];
        state.bingeworthy = bingeworthy?.length > 0 ? bingeworthy : [];
      } else {
        const protectedCategories = ['drama', 'comedy', 'action'];

        for (const [category, categoryMovies] of Object.entries(moviesByCategories)) {
          const categoryKey = category.toLowerCase();
          if (state[categoryKey]) {
            state[categoryKey] =
              categoryMovies.length > 0 && categoryMovies[0]?.content
                ? categoryMovies[0]?.content
                : categoryMovies;
          }
        }
      }

      // Update the state with cached data
      state.movies = movies?.length > 0 ? movies : [];
      state.packageNameToId = packageNameToId;
      state.moviesByCategories = moviesByCategories;
      state.loaders.movies = false; // Stop loading after fetching from cache
      state.dataFromCache = true; // Set cache flag when data comes from cache
    },
    fetchMovies_error: (state) => {
      state.loaders.movies = false;
      state.error = true;
    },
    fetchCategory_begin: (state) => {
      state.loaders.category = true;
      state.error = false;
    },
    fetchCategory_success: (state, action) => {
      state.nameToId = action.payload.packageNameToId;
      state.packageNameToId = action.payload.packageNameToId;
      state.category = action.payload.category[0]["content"];
      state.loaders.category = false;
    },
    fetchCategory_error: (state) => {
      state.loaders.category = false;
      state.error = true;
    },
    fetchMovieDetails_begin: (state) => {
      state.loaders.movieDetails = true;
      state.error = false;
    },
    fetchMovieDetails_success: (state, action) => {
      state.movieDetails = action.payload;
      state.loaders.movieDetails = false;
    },
    fetchMovieDetails_error: (state) => {
      state.loaders.movieDetails = false;
      state.error = true;
    },
    fetchMovieVideo_success: (state, action) => {
      state.video = action.payload.url;
      state.loaders.movieVideo = true;
    },
    fetchMovieVideo_error: (state) => {
      state.loaders.movieVideo = false;
      state.error = true;
    },
    selectedMovieReducer: (state, action) => {
      state.selectedMovie = action.payload;
      localStorage.setItem("selectedMovie", JSON.stringify(action.payload));
    }
  }
});

export default fetchMovieSlice.reducer;
export const {
  fetchMovies_begin,
  fetchMovies_success,
  fetchMovies_error,
  fetchCategory_begin,
  fetchCategory_success,
  fetchCategory_error,
  fetchMovieDetails_begin,
  fetchMovieDetails_success,
  fetchMovieDetails_error,
  fetchMovieVideo_success,
  fetchMovieVideo_error,
  fetchMoviesByCategory,
  setGenreCategories,
  fetchBannerTrailer,
  fetchPackageMoviesReducer,
  fetchSimilarMoviesReducer,
  fetchOneSeriesReducer,
  fetchWatchlistReducer,
  fetchGenresReducer,
  fetchChannelsReducer,
  fetchAgeRatingsReducer,
  fetchChannelCategoriesReducer,
  fetchAllSeriesReducer,
  selectedMovieReducer,
  fetchMovies_fromCache
} = fetchMovieSlice.actions;
