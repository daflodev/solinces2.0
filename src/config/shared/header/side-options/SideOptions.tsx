import { useState } from 'react';

import {
  youtubeIcon,
  moonIcon,
  sunIcon,
  helpCircleIcon
  } from "./sideOptionsIcons"

import "./styles/sideOptions.css";
import { Affix } from 'antd';


const SideOptions = ()=>{

  const [currentTheme, setCurrentTheme] = useState(document.body.className)

  const switchTheme = () =>{

    document.body.classList.toggle("dark-theme");

    setCurrentTheme(document.body.className)

  };

    return(
      <div className="side-options-container">
        <Affix>
          <div className="side-options-element">

            <div className="side-option-icon">
              {youtubeIcon}
            </div>

            <br/>

            <div className="side-option-icon">
              {helpCircleIcon}
            </div>

            <br/>

              {currentTheme == "light-theme" ? 
                <div onClick={switchTheme} className="side-option-icon">
                  {moonIcon}
                </div> 
                : 
                <div onClick={switchTheme} className="side-option-icon">
                  {sunIcon}
                </div>}

          </div>
        </Affix>
      </div>
    )
  }

export {
    SideOptions
}