import React from 'react'
import NavBar from '../NavBar/NavBar.tsx'
import Footer from '../Footer/Footer.tsx'
const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="homeContainer">
        <h1>Welcome to the Home Page</h1>
        <p>This is a sample home page for a website.</p>
        </div>
      <Footer />
    </div>
  )
}

export default Home
