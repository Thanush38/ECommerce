import React from 'react'
import './Footer.css'
import {ExampleLoaderComponent} from "../../dev/palette";
const Footer = () => {
  return (
    <div className='footerContainer'>
      <body>
      <footer>
        <div className="f-item-con">
          <div className="app-info">
                <span className='app-name'>
                    <span className='app-initial'>S</span>hadow Posters
                </span>
            <p>We provide you with <strong>High Quality</strong> and <strong>Cheaps</strong> Posters.
            </p>
          </div>
          <div className="useful-links">
            <div className="footer-title">Useful Links</div>
            <ul>
              <a></a>
              <a href="/">
                <li>Home</li>
              </a>
              <a href="/products">
                <li> Products</li>
              </a>
              <a href="/about">
                <li> About us</li>
              </a>
              <a href="/policy">
                <li> Privacy Policy</li>
              </a>
              <a href="/policy">
                <li> Shipping and Returns</li>
              </a>
              <a href="/policy">
                <li> Frequently Asked Questions</li>
              </a>
            </ul>
          </div>
          <div className="help-sec">
            <div className="footer-title">Help</div>
            <ul>
              <li>Help Me</li>
              <li>Feedback</li>
              <li>Report a Issue / Bug</li>
            </ul>
          </div>
          <div className="g-i-t">
            <div className="footer-title">Get in Touch</div>
            <form action="/" method="post" className="space-y-2">
              <input type="text" name="g-name" className="g-inp" id="g-name" placeholder='Name'/>
              <input type="email" name="g-email" className="g-inp" id="g-email" placeholder='Email'/>
              <textarea  name="g-msg" className="g-inp h-40 resize-none" id="g-msg"
                        placeholder='Message...'></textarea>
              <button type="submit" className='f-btn'>Submit</button>
            </form>
          </div>
        </div>
        <div className='cr-con'>Copyright &copy; 2023 | Made by Thanush Dinesh</div>
      </footer>

      </body>
    </div>
  )
}

export default Footer
