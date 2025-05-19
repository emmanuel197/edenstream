import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReelWrapper from "../components/reels/ReelWrapper";
import "../components/styles/search.scss";
import Button from "../components/buttons/Button";
import SelectInput from "../components/formInputs/selectInput";
import { selectSortIcon, selectCountryIcon, selectReleaseYearIcon } from "../../utils/assets";

const Search = () => {
  const { searchQuery, searchResponse } = useSelector((state) => state.input);

  return (
    <>
      <Header />
      <div className="inner-sections-wrapper">
        <FilterComponent />
        <ReelWrapper title={`Search results for: ${searchQuery}`} movies={searchResponse} />
      </div>
      <Footer marginTop="24.1146vw" />
    </>
  );
};

const FilterComponent = () => {
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

  const filterHandler = () => {
    console.log("Filter clicked!");
    console.log({
      releaseYear,
      country,
      sortBy,
      language
    });
    // You can do an API call or any other filtering logic here
  };

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

  const genres = [
    { id: 1, label: "Faith" },
    { id: 2, label: "Action" },
    { id: 3, label: "Musical" },
    { id: 4, label: "Comedy" },
    { id: 5, label: "Adventure" },
    { id: 6, label: "Sports" },
    { id: 7, label: "School" },
  ];

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
          {genres.map((genre) => (
            <button key={genre.id} className="genre-item">
              {genre.label}
            </button>
          ))}
        </div>
      </div>
      <Button label="Filter" action={filterHandler} className="filter-btn" />
    </section>
  );
};

export default Search;
