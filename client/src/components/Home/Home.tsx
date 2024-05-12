import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Intro from './Intro/Intro'
import Sections from './Sections/Sections'
const Home = () => {
  return (
    <div>
      <NavBar active="home" />
      <div className="homeContainer" >
        <Intro />
        <Sections />
        </div>
      <Footer />
    </div>
  )
}

export default Home
