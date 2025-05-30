import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { COOKIES } from "../../utils/constants";
// import { logout } from "../redux/account";
import { toggleDrawer } from "../redux/slice/drawerSlice";
import Button from "./buttons/Button";
import "./styles/Drawer.scss";
import { closeBtn } from "../../utils/assets";
// import { navigateHandler } from "./Header";
import { COOKIES } from "../../utils/constants";
const Drawer = ({user_info}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  // console.log(user_info)
  const { showDrawer } = useSelector((state) => state.drawer);
  const _hideDrawer = (state) => dispatch(toggleDrawer(state));
  // const user_info = COOKIES.get("user_info");
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
      _hideDrawer();
    }
    prevLocation.current = location.pathname;
  }, [location, showDrawer]);
  // console.log(location.pathname)
  if (showDrawer)
    return (
      <>
        <section className="drawer">
          <ul className="drawer-wrapper">
            {/* <li><Link to='/home'>Featured</Link></li> */}
            {navlinks.map((navlink, index) => {return (
                 <li className={`${!user_info && "invisible"}`}>
                 <Link
                 className={`nav-link ${location.pathname === `/${navlink.link}` ? "active-link" : ""}`}
                  to={`/${navlink.link}`}
                 >
                   {navlink.label}
                 </Link>
               </li>
            )})}
            {!user_info && <div className="signup-login-wrapper">
            <Link className="login-btn" to="/login">Log in</Link>
            <Link className="signup-btn" to="/signup">Sign Up</Link>
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

          {/* <div className='drawer-content'>
                            <Link to='/signup'>
                                <button className='btn-filled'>Sign Up</button>
                            </Link>
                            <Link to='/signin'>
                                <button className='btn-ghost'>Sign In</button>
                            </Link>
                        </div> */}
        </section>
      </>
    );

  return <></>;
};

export default Drawer;
