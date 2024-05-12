import React from 'react'
import './NavBar.css'
import Button from '../reusable/Button/Button'
import Search from './Search/Search'
import Login from '../Login/Login'

type NavBarProps = {
  active: string
}

const NavBar: React.FC<NavBarProps> = (props) => {


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
                <Login />

            </div>
        </div>

        </div>

    </div>
  )
}

export default NavBar
