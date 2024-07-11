import React from 'react'
import NavBar from '../NavBar/NavBar.tsx'
import Footer from '../Footer/Footer.tsx'
import Intro from './Intro/Intro.tsx'
import Sections from './Sections/Sections.tsx'
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
