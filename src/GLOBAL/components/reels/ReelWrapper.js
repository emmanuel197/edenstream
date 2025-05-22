import React from "react";
import MovieCard from "../cards/MovieCard";
import Button from "../buttons/Button";
import "../../components/styles/reel-wrapper.scss"
import { noResultsImg } from "../../../utils/assets";
import { useLocation } from "react-router-dom";
import { useCustomScrollbar } from "../../../utils/scrollbarLogic";
import CustomScrollbar from "../customScrollbar";

const ReelWrapper = ({title, movies}) => {
    console.log(`ReelWrapper ${title} - Movie data structure:`, {
        moviesArray: movies,
        sampleMovie: movies?.[0],
        sampleMovieKeys: movies?.[0] ? Object.keys(movies[0]) : [],
        metadata: movies?.[0]?.metadata,
        imageInfo: {
            image_id: movies?.[0]?.image_id,
            image_store_id: movies?.[0]?.image_store_id
        }
    });

    const location = useLocation();
    const isSearchPage = location.pathname === "/search"; 
    return (
        <section className="reel-wrapper-section">
            <div className="rw-header-wrapper">
                <h2 className={`rw-title ${isSearchPage && "rw-search-title"}`}>
                    {title}
                    </h2>
                {/* {!(isSearchPage && (!movies || movies.length === 0)) ? <Button className="rw-view-all-btn" label="View all" page="/"/> : ""} */}
            </div>
            {isSearchPage && (!movies || movies.length === 0) ? (
        <NoResults />
      ) : (
        <RwContentContainer movies={movies} />
      )}
           {/* <RwContentContainer movies={movies}/> */}
        </section>
    )
}
const NoResults = () => {
    return (
        <div className="no-result-wrapper">
            <img loading="lazy" src={noResultsImg} className="no-results-img"/>
            <p className="no-results-text">
                We are sorry ,we cannot find the streaming 
                content you are looking for    
            </p>
        </div>
    )
}

export const RwContentContainer = ({ movies, marginTop, isChannelsSection = false }) => {
  const { containerRef, scrollThumbRef } = useCustomScrollbar("74");

  return (
    <div className="rw-content-container-wrapper">
      <div
        className="rw-content-container"
        style={{ marginTop }}
        ref={containerRef}
      >
        {movies?.map((movie) => {
          // Transform the movie data to match MovieCard expected props
          const movieCardProps = {
            id: movie.id,
            name: movie.title,
            poster: movie.image_id ? 
                `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==` : 
                null,
            type: movie.type,
            newEpisode: false
          };
          // console.log('Movie card props:', movieCardProps);
          return <MovieCard key={movie.id} movie={movieCardProps} />;
        })}
      </div>
      {!isChannelsSection && <CustomScrollbar thumbRef={scrollThumbRef} />}
    </div>
  );
};

export default ReelWrapper