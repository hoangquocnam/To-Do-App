import React, { useState, useEffect } from "react"


function Button(props) {

  const {
    type = 'button',
    titleValue = '',
    textColor = "#333",
    handleOnClick = undefined,
    className,
  } = props

  useEffect(() => {
    window.addEventListener("click", (e) => handleOnClick)
  })

  return (


    <React.Fragment>
      <input
        type={type}
        defaultValue={titleValue}
        style={{ color: textColor }}
        onClick={handleOnClick}
        className={className}
      >

      </input>
    </React.Fragment>



  );
}

export default Button;
