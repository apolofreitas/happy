import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../assets/img/logo.svg';

import '../styles/pages/landing.scss';

function Landing() {
  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
        <div className="location">
          <strong>Manaus</strong>
          <span>Amazonas</span>
        </div>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>

          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rga(0, 0, 0, 0.6)" />
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Landing;
