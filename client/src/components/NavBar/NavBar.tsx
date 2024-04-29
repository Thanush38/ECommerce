import React from 'react'
import './NavBar.css'
import Button from '../reusable/Button/Button.tsx'
const NavBar = () => {
    const handleLogin = () => {
        console.log("Login")
    }
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="navbarTitle">Shadow Posters</div>
        <div className="navbarRight">
          <a href="#" className="navbarLink">Home</a>
          <a href="#" className="navbarLink">Products</a>
          <div className="navbarCart">Cart: </div>
            <div className="navbarCartIcon">🛒</div>
            <div className="NavBarLoginContainer">
                <Button text="Login" onClick={handleLogin} />
            
            </div>
        </div>
        
        </div>
        
    </div>
  )
}

export default NavBar
