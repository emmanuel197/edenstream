import React, {useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/buttons/Button";
import { closeBtn, watchBackArrow } from "../../utils/assets";
import "../components/styles/SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { prevStep } from "../redux/slice/formSlice";

const AuthLayout = ({
  children,
  headerText,
  showCloseButton = true,
  closePage = "/",
  wrapperClassName = "",
  marginTop
}) => {

  const { step, inputStarted } = useSelector((state) => state.form);
  const location = useLocation()
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const header = document.querySelector('.page-header');
  //   const authLayer = document.querySelector('.auth-form');
    
  //   if (header && authLayer) {
  //     const headerHeight = header.offsetHeight;
  //     authLayer.style.paddingTop = `${headerHeight + 20}px`; // +20px buffer
  //     // authLayer.style.height = `calc(100vh - ${headerHeight}px)`;
  //   }
  // }, []);
  const backHandler = () => {
    console.log("back")
    dispatch(prevStep())
  }
  return (
    <div className="auth-layer">
    <Header variantClassName="auth-variant" />
    <main className="auth-wrapper">
      
      <div className="auth-form">
        <div className={`auth-form-wrapper ${wrapperClassName}`}>
         {location.pathname === "/signup" && <div className="sign-up-pagination">
          {[...Array(4)].map((_, index) => (
    <div key={index} className={`pagination-rectangle ${(step===index+1) && "active-rectangle"}`}></div>
  ))}
          </div>}
          <div className="back-close-btns-wrapper">
            {step !== 1 && <Button className="back-arrow" icon={watchBackArrow} action={backHandler}/>}
          {showCloseButton && (
            <Button
              className="auth-close-btn"
              icon={closeBtn}
              page={closePage}
            />
          )}
            </div>
          
          <div className="auth-form-container" style={{marginTop: marginTop}}>
            {headerText && <h2 className="auth-form-header">{headerText}</h2>}
            {children}
          </div>
        </div>
      </div>
          <div className="form-aside"></div>
    </main>
     <Footer marginTop="5.313vw" />
     </div>
  );
};

export default AuthLayout;
