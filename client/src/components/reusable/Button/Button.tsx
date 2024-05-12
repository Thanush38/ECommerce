import React from 'react'
import './Button.css'

type ButtonProps = {
    text: string,
    onClick: () => void

}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="buttonContainer">
      <button className="greenButton" onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Button
