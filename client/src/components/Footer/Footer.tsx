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

    }


    request.send(JSON.stringify(payload));


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
            <p>We provide you with <strong>High Quality</strong> and <strong>Cheap</strong> Posters.
            </p>
            <div className="social-links">
              <ul className="social">
                <li className="social-item">
                  <a className="social-link" href="https://www.instagram.com/shadow_posters?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                            fill="currentColor"></path>
                      <path
                          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                          fill="currentColor"></path>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                            fill="currentColor"></path>
                    </svg>
                  </a>
                </li>
                <li className="social-item">
                  <a className="social-link" href="https://www.facebook.com/shadowposters">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                          fill="currentColor"></path>
                    </svg>
                  </a>
                </li>
                <li className="social-item">
                  <a className="social-link" href="https://github.com/Thanush38">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                      <path
                          d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                    </svg>
                  </a>
                </li>
                <li className="social-item">
                  <a className="social-link" href="mailto:shadowposters@gmail.com">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        width="655.359"
                        height="655.359"
                        style={{
                          shapeRendering: "geometricPrecision",
                          textRendering: "geometricPrecision",
                          fillRule: "evenodd",
                          clipRule: "evenodd"
                        }}
                        viewBox="0 0 6.827 6.827"
                    >
                      <path
                          d="M5.867 5.079a.107.107 0 0 0 .107-.107V2.683a.107.107 0 0 0-.107-.106H1.508a.107.107 0 0 0-.107.106v2.29c0 .058.048.106.107.106h4.36z"
                          style={{fill: "#b8b8b8", fillRule: "nonzero"}}
                      />
                      <path
                          d="m3.687 3.979.002-.001 2.057-1.23L4.303 3.83l1.459 1.036-1.655-.907-.36.238a.106.106 0 0 1-.058.018h-.003a.106.106 0 0 1-.058-.018l-.36-.238-1.655.907 1.459-1.036-1.443-1.08 2.057 1.229h.001z"
                          style={{fill: "#a4a4a4", fillRule: "nonzero"}}
                      />
                      <path
                          d="M1.913 1.685c-.147 0-.28.025-.396.071a.91.91 0 0 0-.303.194A1.07 1.07 0 0 0 1 2.243a1.499 1.499 0 0 0-.126.365 2.013 2.013 0 0 0-.04.411c0 .154.018.294.054.418a.855.855 0 0 0 .17.321c.077.09.175.158.294.206.119.048.26.072.424.073.07 0 .137-.005.204-.014a.863.863 0 0 0 .378-.147l.018-.206a.841.841 0 0 1-.384.172 1.142 1.142 0 0 1-.204.016.839.839 0 0 1-.427-.1.595.595 0 0 1-.247-.283 1.088 1.088 0 0 1-.08-.444c0-.134.01-.26.033-.378.022-.117.056-.224.102-.32a.882.882 0 0 1 .173-.249.73.73 0 0 1 .245-.16.875.875 0 0 1 .32-.057c.15 0 .271.03.366.085a.506.506 0 0 1 .21.237.886.886 0 0 1 .066.362 1.667 1.667 0 0 1-.04.383.887.887 0 0 1-.057.175.381.381 0 0 1-.087.125.18.18 0 0 1-.12.048.09.09 0 0 1-.058-.018.087.087 0 0 1-.027-.047.18.18 0 0 1-.002-.063l.09-.857h-.203l-.021.185a.274.274 0 0 0-.092-.146.262.262 0 0 0-.165-.05.317.317 0 0 0-.188.049.357.357 0 0 0-.123.15.731.731 0 0 0-.059.236l-.033.298a.738.738 0 0 0 .01.236.296.296 0 0 0 .088.16c.044.039.103.06.177.06a.31.31 0 0 0 .307-.202.21.21 0 0 0 .068.15c.04.035.096.052.168.053.07 0 .138-.021.202-.063a.578.578 0 0 0 .175-.181c.052-.08.092-.177.123-.292a1.58 1.58 0 0 0 .003-.737.729.729 0 0 0-.14-.272.626.626 0 0 0-.251-.18 1.01 1.01 0 0 0-.38-.066zm-.086.803c.044 0 .079.01.106.03.028.02.047.049.058.084.01.036.014.078.009.125l-.03.286a.459.459 0 0 1-.037.142.225.225 0 0 1-.076.092.196.196 0 0 1-.117.032.174.174 0 0 1-.11-.036.173.173 0 0 1-.055-.095.4.4 0 0 1-.005-.138l.027-.268a.343.343 0 0 1 .07-.189.195.195 0 0 1 .16-.065z"
                          style={{fill: "#373737", fillRule: "nonzero"}}
                      />
                      <path style={{fill: "none"}} d="M0 0h6.827v6.827H0z"/>
                    </svg>

                  </a>
                </li>

              </ul>

            </div>
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
          <div className="g-i-t">
            <div className="footer-title">Get in Touch</div>
            <form onSubmit={handleFormSubmit} method="post" className="space-y-2">
              <input type="text" name="gname" className="g-inp" id="gname" placeholder='Name'/>
              <input type="email" name="gemail" className="g-inp" id="gemail" placeholder='Email'/>
              <textarea name="gmsg" className="g-inp h-40 resize-none" id="gmsg"
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
