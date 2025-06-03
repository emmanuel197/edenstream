import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleDrawer } from "../redux/slice/drawerSlice";
import Button from "./buttons/Button";
import "./styles/Drawer.scss";
import { closeBtn } from "../../utils/assets";
import { COOKIES } from "../../utils/constants";

const Drawer = ({user_info}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  const { showDrawer } = useSelector((state) => state.drawer);
  const _hideDrawer = (state) => dispatch(toggleDrawer(state));

  const navlinks = [{label: "Home",  link:"home"},
        {label: "Movies", link: "movies"},
        {label: "Word", link: "word"},
        {label:"Music", link: "music"},
        {label: "Live Tv", link: "livetv"},
        {label: "My List", link: "mylist"},
        {label:"Subscriptions", link: "subscription"} ]

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    if (prevLocation.current !== location.pathname && showDrawer) {
      _hideDrawer(false); // Ensure drawer closes on route change
    }
    prevLocation.current = location.pathname;
  }, [location, showDrawer]);

  // Conditionally render the drawer based on showDrawer state
  if (!showDrawer) {
    return null; // Render nothing if the drawer is not supposed to be shown
  }

  return (
    <>
      {/* Apply 'open' class based on showDrawer state */}
      <section className={`drawer ${showDrawer ? 'open' : ''}`}>
        <ul className="drawer-wrapper">
          {navlinks.map((navlink, index) => {return (
               <li key={index} className={`${!user_info && "invisible"}`}>
               <Link
               className={`nav-link ${location.pathname === `/${navlink.link}` ? "active-link" : ""}`}
                to={`/${navlink.link}`}
                onClick={() => _hideDrawer(false)} // Close drawer on link click
               >
                 {navlink.label}
               </Link>
             </li>
          )})}
          {!user_info && <div className="signup-login-wrapper">
          <Link className="login-btn" to="/login" onClick={() => _hideDrawer(false)}>Log in</Link> {/* Close drawer on login link click */}
          <Link className="signup-btn" to="/signup" onClick={() => _hideDrawer(false)}>Sign Up</Link> {/* Close drawer on signup link click */}
          </div>}
          <li>
            {" "}
            <Button
              icon={closeBtn}
              className="close-btn"
              action={() => _hideDrawer(false)}
            />
          </li>
        </ul>
      </section>
    </>
  );
};

export default Drawer;
