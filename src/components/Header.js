import './searchBar.scss'
import logo from './logo.png'
import { useState } from 'react'

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const searchInput = document.querySelector("#input-search");

  //changes state of isOpen on search bar click and alters search bar css open /closed accordingly
  const toggleClass = () => {
    setOpen(!isOpen);
    searchInput.focus();
    searchInput.value = " ";
  };

    return(
        <header className="App-header">
          <div  className="header-left">
            <a href="#top"><img src={logo} className="App-logo" alt="logo" /></a>
            <a href="#top" className="top-link"><p className="App-title">
            Beer Me That Episode </p></a>
          </div>
        
          <div  className="header-right">
            <p className="header-text">
              Click on a meme to watch the episode on Netflix! </p>
            
              <div className={isOpen ? "search-open": "search"} >
                <svg onClick={toggleClass} className="search__icon" viewBox="0 0 375 374.999991" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="clip-0"><path d="M 51.949219 66.398438 L 242 66.398438 L 242 256 L 51.949219 256 Z M 51.949219 66.398438 " clip-rule="nonzero"/></clipPath><clipPath id="clip-1"><path d="M 222 239 L 321 239 L 321 337.148438 L 222 337.148438 Z M 222 239 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#clip-0)"><path d="M 146.78125 97.570312 C 181.921875 97.570312 210.410156 126.050781 210.410156 161.175781 C 210.410156 196.328125 181.921875 224.832031 146.78125 224.832031 C 111.640625 224.832031 83.15625 196.335938 83.15625 161.175781 C 83.15625 126.050781 111.640625 97.570312 146.78125 97.570312 M 146.78125 66.398438 C 94.519531 66.398438 51.988281 108.929688 51.988281 161.175781 C 51.988281 213.460938 94.519531 255.96875 146.78125 255.96875 C 199.050781 255.96875 241.5625 213.457031 241.5625 161.175781 C 241.5625 108.929688 199.050781 66.398438 146.78125 66.398438 Z M 146.78125 66.398438 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#clip-1)"><path d="M 294.15625 337.125 C 287.496094 337.125 280.875 334.597656 275.796875 329.519531 L 229.699219 283.410156 C 219.546875 273.277344 219.546875 256.859375 229.699219 246.6875 C 239.851562 236.546875 256.273438 236.546875 266.421875 246.6875 L 312.519531 292.800781 C 322.671875 302.945312 322.671875 319.371094 312.519531 329.519531 C 307.445312 334.597656 300.820312 337.125 294.15625 337.125 Z M 294.15625 337.125 " fill-opacity="1" fill-rule="nonzero"/></g><path d="M 220.109375 215.09375 L 245.4375 240.410156 L 223.402344 262.457031 L 198.074219 237.140625 Z M 220.109375 215.09375 " fill-opacity="1" fill-rule="nonzero"/></svg>
                <form action="/" method="get">
                  <label htmlFor="input-search">
                    <span className="hidden">Search for a meme</span>
                  </label>
                  <input type="text" id="input-search" className="search__input" autoFocus placeholder=" "></input>
                </form>
              </div>
          </div>
      </header>
    )
}

export default Header