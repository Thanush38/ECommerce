import React from 'react'
import './Footer.css'
import {ExampleLoaderComponent} from "../../dev/palette";
const Footer = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url:string = "http://localhost:8080/server-1.0-SNAPSHOT/api/contents/contactemail";
    const contentType: string = 'application/json';

    let name:string = (e.target as any).gname.value;
    let email:string = (e.target as any).gemail.value;
    let message:string = (e.target as any).gmsg.value;

    const payload = {
      name: name,
      email: email,
      message: message
    }

    const request = new XMLHttpRequest();
    request.open("POST", url);                              // setting the method
    request.setRequestHeader("Content-Type", "application/json");  // setting the sending content-type
    request.setRequestHeader("Accept", contentType);

    // on response handler
    request.onload = () => {
      if (request.status !== 200) {
        console.error   ("Something went wrong went contacting the server");
        return
      }
      console.log("Received from the server: ", request.responseText) // this contains the received payload
    }

    console.log("sending the payload")
    request.send(JSON.stringify(payload));

    console.log('Form Submitted');
  }

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
            <form onSubmit={handleFormSubmit} method="post" className="space-y-2">
              <input type="text" name="gname" className="g-inp" id="gname" placeholder='Name'/>
              <input type="email" name="gemail" className="g-inp" id="gemail" placeholder='Email'/>
              <textarea  name="gmsg" className="g-inp h-40 resize-none" id="gmsg"
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
