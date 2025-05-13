import React from 'react';
import "../components/styles/loader.scss"
import { useState, useEffect } from 'react';
const Spinner = ({marginLeft}) => {
  
    return (
        <div style={{marginLeft: marginLeft}}>
          <span styles={{marginLeft: marginLeft}} className="loader"></span>
        </div>
          
    );
  };
  
  export default Spinner;