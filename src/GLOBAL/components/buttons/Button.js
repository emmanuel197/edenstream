// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../../components/styles/buttons.scss";
// import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { playIcon, active } from "../../../utils/assets";

// const Button = ({ label, action, page, isDisabled = false, selectedMovie, className }) => {
//   const dispatch = useDispatch();
//   const location = useLocation()
//   // const isAuthenticated = JSON.parse(
//   //   window.localStorage.getItem("isAuthenticated")
//   // );
//   if (page) dispatch(selectedMovieReducer(selectedMovie));

//   if (action)
//     return (
//       <>
//         <button disabled={isDisabled} onClick={action} className={`filled-btn  ${className}`}>
//           <div>
//             <p> {label}</p>
//           </div>
//         </button>
//       </>
//     );

//   if (page)
//     return (
//       <>
//         <Link to={page} className={`filled-btn  ${className} ${playIcon ? "with-icon" : ""}`}>
//           <div className="align-content">
//             {location.pathname !== "/" && <img loading="lazy" src={playIcon} alt="Play Icon"></img>}
//             <p> {label}</p>
//           </div>
//         </Link>
//       </>
//     );

//   return <></>;
// };

// export default Button;

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import "../../components/styles/buttons.scss";
// import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
// import { playIcon } from "../../../utils/assets";

// const Button = ({ label, action, page, isDisabled = false, selectedMovie, className }) => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));

//   const handleClick = () => {
//     if (!isAuthenticated) {
//       navigate("/signin", { state: { redirectTo: page } });
//     } else {
//       dispatch(selectedMovieReducer(selectedMovie));
//       navigate(page);
//     }
//   };

//   useEffect(() => {
//     if (page && selectedMovie) {
//       dispatch(selectedMovieReducer(selectedMovie));
//     }
//   }, [dispatch, page, selectedMovie]);

//   if (action) {
//     return (
//       <button disabled={isDisabled} onClick={action} className={`filled-btn ${className}`}>
//         <div>
//           <p>{label}</p>
//         </div>
//       </button>
//     );
//   }

//   if (page) {
//     return (
//       <button disabled={isDisabled} onClick={handleClick} className={`filled-btn ${className} ${playIcon ? "with-icon" : ""}`}>
//         <div className="align-content">
//           {location.pathname !== "/" && <img loading="lazy" src={playIcon} alt="Play Icon" />}
//           <p>{label}</p>
//         </div>
//       </button>
//     );
//   }

//   return null;
// };

// export default Button;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../../components/styles/buttons.scss";
import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
import { playIcon } from "../../../utils/assets";
import { redirectReducer } from "../../redux/slice/authSlice";
import { COOKIES } from "../../../utils/constants";
import Spinner from "../Spinner"
const Button = ({ label, action, page, isDisabled = false, selectedMovie, className, id, icon, svg }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user_info = COOKIES.get("user_info")
  // const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));
  console.log(svg)
  const handleClick = () => {
    // if (!user_info) {
    //   navigate("/signin");
    //   dispatch(redirectReducer(page))
      
    // }
    //  else {
      if (selectedMovie) {
        dispatch(selectedMovieReducer(selectedMovie));
        
      }
       
      const state = { variant: "movie" }
     
      navigate(page, {state: state});
    // }
    console.log(page)
  };

  useEffect(() => {
    if (page && selectedMovie) {
      dispatch(selectedMovieReducer(selectedMovie));
    }
  }, [dispatch, page, selectedMovie]);

  if (action) {
    return (
      <button disabled={isDisabled} onClick={action} id={id} className={`filled-btn ${className}`}>
        <div className="align-content">
          {icon && <img src={icon} alt={`"
          ${icon} image"`} title={`"
            ${icon} image"`}/>}
            {svg && svg}
          <p>{label}</p>
          {isDisabled && <Spinner marginLeft="10px"/>}
        </div>
      </button>
    );
  }

  if (page) {
    return (
      <button disabled={isDisabled} onClick={handleClick} id={id} className={`filled-btn ${className} ${playIcon ? "with-icon" : ""}`}>
        <div className="align-content">
        {icon && <img src={icon} alt={`"
          ${icon} image"`} title={`"
            ${icon} image"`} />}
            {svg && svg}
          {/* {location.pathname !== "/" && playIcon && <img loading="lazy" src={playIcon} alt="Play Icon" />} */}
          <p>{label}</p>
        </div>
      </button>
    );
  }

  return null;
};

export default Button;
