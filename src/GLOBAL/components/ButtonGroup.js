import Button from "../components/buttons/Button";
import OutlineButton from "../components/buttons/OutlineButton";
const ButtonGroup = ({ location, selectedMovieId, selectedMovieUid }) => {
  if (location.pathname === "/") {
    return (
      <>
        <Button
          page="/home"
          label="WATCH MOVIE"
          className="landing-page-dynamic-btns"
        />
        <Button
           page="/home"
          label="TRAILER"
          className="landing-page-dynamic-btns"
        />
        <Button
           page="/home"
          label="SHARE"
          className="landing-page-dynamic-btns"
        />
      </>
    );
  } else {
    return (
      <>
        <Button
          page={
            location.pathname === "/series"
              ? `/series/${selectedMovieId}`
              : `/watch/movie/${selectedMovieUid}`
          }
          selectedMovie={selectedMovieId}
          label="Play"
        />
        <OutlineButton
          page={
            location.pathname === "/series"
              ? `/series/${selectedMovieId}`
              : `/movie/${selectedMovieId}`
          }
          label="Info"
        />
      </>
    );
  }
};

export default ButtonGroup;


   {/* {["/series", "/movies", "/home"].includes(
                      location.pathname
                    ) && (
                      <>
                        <Button
                          page={
                            location.pathname === "/series"
                              ? `/series/${selectedMovie.id}`
                              : `/watch/movie/${selectedMovie.uid}`
                          }
                          selectedMovie={selectedMovie.id}
                          label="Play"
                        />
                        <OutlineButton
                          page={
                            location.pathname === "/series"
                              ? `/series/${selectedMovie.id}`
                              : `/movie/${selectedMovie.id}`
                          }
                          label="Info"
                        />
                      </>
                    )} */}