import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'components/Navbar';
import HomePage from 'pages/HomePage/index';
import MintPage from 'pages/Mint/index';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from 'contexts/Web3Context';
import { Web3Provider as ww } from "@ethersproject/providers";
import JoinUs from 'pages/JoinUs/index';
import Footer from 'components/Footer/index';
import AOS from "aos";
import "aos/dist/aos.css";
import MyCats from 'pages/MyCats/index';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import AllCats from 'pages/MintedCats/index';
import AuthorizeDiscord from 'pages/AuthorizeDiscord/index';


AOS.init({
  // once: true
}
);



function getLibrary(provider) {
  var library;

  if (provider?.chainType === "hmy") {
    library = provider.blockchain;
  } else {
    library = new ww(provider);
    library.pollingInterval = 12000;
  }

  return library;
}

function App() {
  return (

    <Web3ReactProvider getLibrary={getLibrary}>
      <NotificationContainer />

      <Web3Provider >
        <Router>

          <Routes>

            <Route path="/mint" element={<MintPage />} />
            <Route path="/jointhecafe" element={<JoinUs />} />
            <Route path="/mycats" element={<MyCats />} />
            <Route path="/allcats" element={<AllCats />} />
            <Route path="/authorize/discord" element={<AuthorizeDiscord />} />

            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </Web3Provider>
    </Web3ReactProvider>


  );
}

export default App;
