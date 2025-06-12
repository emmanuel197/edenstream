
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
  
  const handleClick = () => {
      if (selectedMovie) {
        dispatch(selectedMovieReducer(selectedMovie));
      }
       
      const state = { variant: "movie" }
     
      navigate(page, {state: state});
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
          ${icon} image"`} title={`${icon.split('/').pop().split('.')[0]} image`}/>}
            {svg && svg}
          <p>{label}</p>
          {isDisabled && <Spinner marginLeft="10px"/>}
        </div>
      </button>
    );
  }

  if (page) {
    console.log(page)
    return (
      <button disabled={isDisabled} onClick={handleClick} id={id} className={`filled-btn ${className} ${playIcon ? "with-icon" : ""}`}>
        <div className="align-content">
        {icon && <img src={icon} alt={`"
          ${icon} image"`} title={`${icon.split('/').pop().split('.')[0]} image`} />}
            {svg && svg}
          <p>{label}</p>
        </div>
      </button>
    );
  }

  return null;
};

export default Button;
