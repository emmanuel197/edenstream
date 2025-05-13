// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation } from "react-router-dom";
// import { COOKIES } from "../../utils/constants";
// import { logout } from "../redux/account";
// import { toggleDrawer } from '../redux/slice/drawerSlice';
// import Button from "./buttons/Button";
// import './styles/Drawer.scss';
// import { navigateHandler } from "./Header";
// const Drawer = () => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const { showDrawer } = useSelector(state => state.drawer);
//     const _hideDrawer = (state) => dispatch(toggleDrawer(state));
//     const user_info = COOKIES.get("user_info");

//     const [showDropdown, setShowDropdown] = useState(false);
//     const toggleDropdown = () => setShowDropdown(!showDropdown);

//     useEffect(() => {
//         // console.warn('location changed!');
//         _hideDrawer();
//     }, [location]);

//     if (showDrawer) return (
//         <>
//             <section className="drawer">
//                 <div className="drawer-wrapper">
//                     <span className='close-btn' onClick={() => _hideDrawer(false)}>&times;</span>

//                         <ul>
//                             {/* <li><Link to='/home'>Featured</Link></li> */}
//                             <li><Link
//                             //  to='/movies'
//                              onClick={() => navigateHandler('/movies')}>Movies</Link></li>
//                             {/* e */}
//                             <li><Link
//                             // to='/livetv'
//                              onClick={() => navigateHandler('/livetv')}>Live TV</Link></li>
//                             <li><Link to='/afripremiere'>AfriPremiere</Link></li>
//                             <li><Link to='/afriplaylive'>Live Drama</Link></li>
//                             <li>
//                                 <button onClick={toggleDropdown} className='dropdown-toggler' style={{background: 'transparent', color: 'white'}}>
//                                     Access Packs
//                                 </button>
//                                 {showDropdown && (
//                                     <ul className='dropdown-menu'>
//                                         <li><Link style={{marginLeft: '1rem'}} to='/subscriptions'>Packs</Link></li>
//                                         <li><Link style={{marginLeft: '1rem'}} to='/subscription-history'>History</Link></li>
//                                     </ul>
//                                 )}
//                             </li>
//                             <li><Link to='/profile'>Profile</Link></li>
//                             <button onClick={logout} className='btn-filled'>Logout</button>
//                         </ul>
//

//                     {!user_info ? (
//                         <div className='drawer-content'>
//                             <Link to='/signup'>
//                                 <button className='btn-filled'>Sign Up</button>
//                             </Link>
//                             <Link to='/signin'>
//                                 <button className='btn-ghost'>Sign In</button>
//                             </Link>
//                         </div>
//                     ) : <></>}
//                 </div>
//             </section>
//         </>
//     );

//     return <></>;
// };

// export default Drawer;

import { useState, useEffect } from "react";
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

  console.log(user_info)
  const { showDrawer } = useSelector((state) => state.drawer);
  const _hideDrawer = (state) => dispatch(toggleDrawer(state));
  // const user_info = COOKIES.get("user_info");
    const navlinks = [{label: "Home",  link:"home"}, 
        {label: "Movies", link: "movies"}, 
        {label: "Word", link: "word"}, 
        {label:"Music", link: "music"}, 
        {label: "Live Tv", link: "linktv"}, 
        {label: "Live Radio", link: "liveradio"}, 
        {label:"Subscriptions", link: "subscription"} ]
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    // console.warn('location changed!');
    _hideDrawer();
  }, [location]);
  console.log(location.pathname)
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
