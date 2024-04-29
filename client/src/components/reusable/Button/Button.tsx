import React from 'react'
import './Button.css'
const Button = (props) => {
  return (
    <div className="buttonContainer">
      <button className="greenButton" onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Button
