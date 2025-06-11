import React from 'react';
import "../components/styles/loader.scss"
import { useState, useEffect } from 'react';
const Spinner = ({wrapperClass, marginLeft, className}) => {
  
    return (
        <div className={wrapperClass} style={{marginLeft: marginLeft}}>
          <span styles={{marginLeft: marginLeft}} className={`loader ${className}`}></span>
        </div>
          
    );
  };
  
  export default Spinner;