import React from 'react'
import './NavBar.css'
import Button from '../reusable/Button/Button.tsx'
import Search from './Search/Search.tsx'
const NavBar = (props) => {

    const handleLogin = () => {
        console.log("Login")
    }
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="navbarLeft">
            <a href="/" className={`navbarLink ${props.active === 'home' ? 'active' : ''}`}>Home</a>
            <a href="/products" className={`navbarLink ${props.active === 'products' ? 'active' : ''}`}>Products</a>
        </div>
        <div className="navbarTitle">Shadow Posters</div>
        <div className="navbarRight">
            <div className="navbarSearch">
                <Search />
            </div>

          <div className="navbarCart">Cart: </div>
            <div className="NavBarLoginContainer">
                <Button text="Login" onClick={handleLogin} />

            </div>
        </div>

        </div>

    </div>
  )
}

export default NavBar
