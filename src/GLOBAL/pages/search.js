import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReelWrapper from "../components/reels/ReelWrapper";
import "../components/styles/search.scss";
import Button from "../components/buttons/Button";
import SelectInput from "../components/formInputs/selectInput";
import { selectSortIcon, selectCountryIcon, selectReleaseYearIcon } from "../../utils/assets";
import { fetchGenres, fetchMovieByGenre } from "../redux/fetchMoviesApi";
import { setActiveGenreTab } from '../redux/slice/genreTabSlice';
import { genreTabs } from '../constants/genres'
import TextInput from "../components/formInputs/textInput";
import { WrapperSearch, SearchFilter } from "../../utils/assets";
import { search } from "../redux/fetchMoviesApi";
import { Link } from "react-router-dom";
// import { handleSearchInput } from "../redux/slice/inputSlice";
const Search = () => {
  const dispatch = useDispatch();
  const { searchQuery, searchResponse } = useSelector((state) => state.input);
  const { genres } = useSelector((state) => state.fetchMovies);
  const { activeGenreTab } = useSelector(state => state.genreTab);
  const [filtered, setFiltered] = useState(false);
 const [showFilter, setShowFilter] = useState(false);
   const handleSearchInput = (e) => {
      const text = e.target.value;
      console.log('Search input changed:', text);
      // setSearchQuery(text);
      console.log('Dispatching search action with text:', text);
      dispatch(search(text));
    };

    const handleSearchFilter = () => {
     setShowFilter(prev => !prev);
     console.log('Search filter toggled:', showFilter);
    };
  useEffect(() => {
    fetchGenres(dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log('activeGenreTab:', activeGenreTab);
  }, [activeGenreTab]);

  // Get filtered movies from Redux (e.g., actionCategory, dramaCategory, etc.)
  const filteredMovies = useSelector(state => {
    if (!activeGenreTab || activeGenreTab === "ALL") return searchResponse;
    const key = activeGenreTab.toLowerCase() + "Category";
    return state.fetchMovies[key] || [];
  });

  return (
    <>
      <Header />
      <div className="inner-sections-wrapper">
 <div className="search-filter-wrapper">
                  <div className="search-wrapper">
                    <TextInput value={searchQuery} onChange={handleSearchInput} icon={<WrapperSearch className="wrapper-search"/>} className="header-search-textinput"/>
                  </div>
                  <div className="filter-wrapper" onClick={handleSearchFilter}>
                    <SearchFilter  className="search-filter-img" />
                  </div>
                </div>
        {!showFilter && <FilterComponent
          genres={genres}
          activeGenreTab={activeGenreTab}
          setActiveGenreTab={genre => dispatch(setActiveGenreTab(genre))}
          onFilter={() => setFiltered(true)}
        />}
        <ReelWrapper
          title={`Search results for: ${searchQuery}`}
          movies={filtered && activeGenreTab !== "ALL" ? filteredMovies : searchResponse}
        />
      </div>
      <Footer marginTop="24.1146vw" />
    </>
  );
};

const FilterComponent = ({ genres, activeGenreTab, setActiveGenreTab, onFilter }) => {
  const dispatch = useDispatch();
  const [releaseYear, setReleaseYear] = useState("");
  const [country, setCountry] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [language, setLanguage] = useState("");

  const yearOptions = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" }
  ];
  const countryOptions = [
    { value: "all", label: "All" },
    { value: "us", label: "United States" },
    { value: "gh", label: "Ghana" },
    { value: "ng", label: "Nigeria" }
  ];
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "popular", label: "Most Popular" },
    { value: "latest", label: "Latest" }
  ];
  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" }
  ];

  const categories = [
    { id: 1, label: "Testimonies" },
    { id: 2, label: "Series" },
    { id: 3, label: "Music" },
    { id: 4, label: "Talk Show" },
    { id: 5, label: "Church Service" },
    { id: 6, label: "Concerts" },
    { id: 7, label: "Sermons" },
    { id: 8, label: "Animation" }
  ];

  const handleFilter = () => {
    if (activeGenreTab && activeGenreTab !== "ALL") {
      fetchMovieByGenre(activeGenreTab, dispatch);
    }
    onFilter();
  };

  return (
    <section className="filter-section">
      <h2 className="filter-section-header">Filter</h2>
      <div className="release-country-sort-language">
        <SelectInput
          name="releaseYear"
          value={releaseYear}
          placeholder="Select Year"
          onChange={(e) => setReleaseYear(e.target.value)}
          className="release-year-wrapper"
          options={yearOptions}
          icon={<img loading="lazy" src={selectReleaseYearIcon} />}        
          iconPosition="left"        
        />
        <SelectInput
          name="country"
          value={country}
          placeholder="All Countries"
          onChange={(e) => setCountry(e.target.value)}
          options={countryOptions}
          icon={<img loading="lazy" src={selectCountryIcon} />}
          iconPosition="left"
          className="country-wrapper"
        />
        <SelectInput
          name="sortBy"
          value={sortBy}
          placeholder="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
          icon={<img loading="lazy" src={selectSortIcon} />}
          iconPosition="left"
          className="sort-by-wrapper"
        />
        <SelectInput
          name="language"
          value={language}
          placeholder="Language"
          onChange={(e) => setLanguage(e.target.value)}
          options={languageOptions}
          icon={<img loading="lazy" src={selectSortIcon} />}
          iconPosition="left"
          className="language-wrapper"
        />
      </div>
      <div className="category-wrapper">
        <h3 className="category-header">Category</h3>
        <div className="categories">
          {categories.map((category) => (
            <button key={category.id} className="category-item">
              {category.label}
            </button>
          ))}
        </div>
      </div>
      <div className="genre-wrapper">
        <h3 className="genre-header">Genre</h3>
        <div className="genres">
          <button
            className={`genre-item ${activeGenreTab === "ALL" ? "active" : ""}`}
            onClick={() => setActiveGenreTab("ALL")}
          >
            All
          </button>
          {genres && genres.map((genre) => (
            <button
              key={genre.id || genre.uid || genre.name}
              className={`genre-item ${activeGenreTab === genre ? "active" : ""}`}
              onClick={() => setActiveGenreTab(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <Button label="Filter" action={handleFilter} className="filter-btn" />
    </section>
  );
};

export default Search;
