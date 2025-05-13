// src/utils/navigationHelpers.js
import { COOKIES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedMovieReducer } from "../redux/slice/moviesSlice";
import { redirectReducer } from "../redux/slice/authSlice";

export const useHandleNavigation = (selectedMovie) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));
  const user_info = COOKIES.get("user_info");
  const handleClick = (page) => {
    if (!user_info) {
      navigate("/signin");
      dispatch(redirectReducer(page));
    } else {
      if (selectedMovie) {
        dispatch(selectedMovieReducer(selectedMovie));
      }
      navigate(page);
    }
  };

  return handleClick;
};
