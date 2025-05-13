// import { useDispatch, useSelector } from "react-redux"
// import Slider from "react-slick"
// import sliderSettings from "../../utils/sliderConfig/sliderSettings"
// import MovieCard from "../components/cards/MovieCard"
// import Header from "../components/Header"
// // import TopTvAndMovies from "../components/vodReels/TopTvAndMovies"
// import SliderWrapper from "../components/SliderWrapper"
// import '../components/styles/search.scss'

// const Search = () => {
//     const { searchQuery, searchResponse } = useSelector(state => state.input)
//     // const { afriplaytop10 } = useSelector(state => state.fetchMovie)

//     // console.warn('afriplaytop10', afriplaytop10)

//     return (
//         <div>
//             <Header links={5} />
//             <div className="search-main">
//                 <div className="movie-cards-grid">
//                     {
//                         searchResponse.map(_movie => {
//                             return <MovieCard type='search' movie={_movie} key={_movie.id} />
//                         })
//                     }

//                 </div>
//                 {
//                     searchResponse.length < 1 && searchQuery !== '' ? <div>
//                         <p className="primary-text no-results-text">We didn't find any matches for "{searchQuery}".  Browse our most popular TV shows and movies.</p>
//                         {/* <TopTvAndMovies /> */}
//                     </div> : <></>
//                 }
//                 {
//                     searchQuery === '' ? <div>
//                         {/* <TopTvAndMovies /> */}
//                     </div> : <></>
//                 }
//             </div>
//         </div>
//     )
// }

// export default Search
// import Header from "../components/Header";
// import Footer from "../components/Footer"
// import ReelWrapper from "../components/reels/ReelWrapper";
// import "../components/styles/search.scss";
// import Button from "../components/buttons/Button";

// const Search = () => {
//     const filteredMovies = []
//     // { id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
//     //             }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
//     //              {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
//     //             {id:4, name:"Faith Tv", poster: "/assets/faith.png"}
// // Example search query for demonstration
// const query = "dd"; // or fetch from props/router                
//     return (
//         <>
//         <Header/>
//         <div className="inner-sections-wrapper ">
//         <FilterComponent/>
//         <ReelWrapper title={`Search results for: ${query}`} movies={filteredMovies}/>
//         </div>
        
//         <Footer marginTop="24.1146vw"/>
//         </>
//     )
// }
// const FilterComponent = () => {
//     const filterHandler = () => {
//         console.log("filter")
//     } 
//     const categories = [
//         { id: 1, label: "Testimonies" },
//         { id: 2, label: "Series" },
//         { id: 3, label: "Music" },
//         { id: 4, label: "Talk Show" },
//         { id: 5, label: "Church Service" },
//         { id: 6, label: "Concerts" },
//         { id: 7, label: "Sermons" },
//         { id: 8, label: "Animation" },
//         { id: 9, label: "Animation" },
//       ];
//       const genres = [
//         { id: 1, label: "Faith" },
//         { id: 2, label: "Action" },
//         { id: 3, label: "Musical" },
//         { id: 4, label: "Comedy" },
//         { id: 5, label: "Adventure" },
//         { id: 6, label: "Sports" },
//         { id: 7, label: "School" },
//         { id: 8, label: "School" },
//         { id: 9, label: "School" },
//         { id: 10, label: "School" },
//         { id: 11, label: "School" }
//       ];
//     return (
//         <section className="filter-section" >
//             <h2 className="filter-section-header">Filter</h2>
//             <div className="release-country-sort-language">
//             <div className="release-year-wrapper">
//                 <p className="release-year-text"></p>
//             </div>
//             <div className="country-wrapper"></div>
//             <div className="sort-by-wrapper"></div>
//             <div className="language-wrapper"></div>
//             </div>
//             <div className="category-wrapper">
//                 <h3 className="category-header">Category </h3>
//         <div className="categories">
//         {categories.map((category) => (
//           <button key={category.id} className="category-item">
//             {category.label}
//           </button>
//         ))}
//         </div>
            
//             </div>
//             <div className="genre-wrapper">
//             <h3 className="genre-header">Genre</h3>
//             <div className="genres">
//             {genres.map((genre) => (
//           <button key={genre.id} className="genre-item">
//             {genre.label}
//           </button>
//         ))}
//             </div>
//             </div>

//             <Button label="Filter" action={filterHandler} className="filter-btn"/>
//         </section>
//     )
// }
// export default Search


// Search.jsx (or FilterComponent within Search)
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReelWrapper from "../components/reels/ReelWrapper";
import "../components/styles/search.scss";
import Button from "../components/buttons/Button";

import SelectInput from "../components/formInputs/selectInput";
// Suppose you have icons in some asset folder or an icon library
import { selectSortIcon, selectCountryIcon, selectReleaseYearIcon } from "../../utils/assets";
const Search = () => {
  // Example state for search results
  const filteredMovies = [ { id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
}, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
  {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
       {id:4, name:"Faith Tv", poster: "/assets/faith.png"}];
 
  const query = "dd"; // or fetch from props/router

  return (
    <>
      <Header />
      <div className="inner-sections-wrapper">
        <FilterComponent />
        <ReelWrapper title={`Search results for: ${query}`} movies={filteredMovies} />
      </div>
      <Footer marginTop="24.1146vw" />
    </>
  );
};

const FilterComponent = () => {
  // State for each select input
  const [releaseYear, setReleaseYear] = useState("");
  const [country, setCountry] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [language, setLanguage] = useState("");

  // For demonstration, some example options:
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
        {/* Release Year */}
        <SelectInput
          name="releaseYear"
          value={releaseYear}
          placeholder="Select Year"
          onChange={(e) => setReleaseYear(e.target.value)}
          className="release-year-wrapper"
          options={yearOptions}
          icon={<img loading="lazy" src={selectReleaseYearIcon} />}        // Using the icon prop
          iconPosition="left"        // Icon on the left side
        />

        {/* Country */}
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

        {/* Sort By */}
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

        {/* Language */}
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

      {/* Category */}
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

      {/* Genre */}
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

      {/* Filter Button */}
      <Button label="Filter" action={filterHandler} className="filter-btn" />
    </section>
  );
};

export default Search;
