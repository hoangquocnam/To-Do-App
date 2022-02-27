import React, { useEffect } from "react"
import './icon.css'

function Button(props) {
    const {
        type = 'button',
        titleValue = '',
        textColor = "#333",
        handleOnClick = undefined,
        id,
        width,
        height,
        className
    } = props

    useEffect(() => {
        window.addEventListener("click", (e) => handleOnClick)
    })


    if (!className) {
        return (
            <input
                type={type}
                defaultValue={titleValue}
                style={{ color: textColor, width: width, height: height, cursor: 'pointer' }}
                onClick={handleOnClick}
                id={id}
            >
            </input>
        )
    }
    else {
        return (
            <i 
            className= {className}
            onClick={ handleOnClick}
            style = {{cursor: "pointer"}}
            ></i>
        )
    }
}

export default Button