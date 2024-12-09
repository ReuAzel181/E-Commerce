import React from "react";

import "./index.scss";

export default function Footer() {
      return (
            <div className="footer">
                  <div className="footer-credit">
                        <div className="name-credit">@BrandName 2024 | Powered by Figma</div>
                        <div className=""><img src="http://localhost:8080/figma.png" alt="bg1" /></div>
                  </div>

                  <div className="footer-credit" id="footer2">
                        <div className="footer-text">Connect with us:</div>
                        <div className=""><img src="http://localhost:8080/fb.png" alt="facebook" /></div>
                        <div className=""><img src="http://localhost:8080/twitter.png" alt="twitter" /></div>
                        <div className=""><img src="http://localhost:8080/youtube.png" alt="youtube" /></div>
                  </div>


                  
            </div>
      );
}