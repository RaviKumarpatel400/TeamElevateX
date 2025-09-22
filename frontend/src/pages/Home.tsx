import Hero from '../components/Hero';
import WhatWeOffer from '../components/WhatWeOffer';
import MissionStatement from '../components/MissionStatement';
import TechEnthusiasts from '../components/TechEnthusiasts';
import Innovation from '../components/Innovation';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero />

      {/* What We Offer */}
      <WhatWeOffer />

      {/* TeamElevateX Mission Statement */}
      <MissionStatement />

      {/* Tech Enthusiasts */}
      <TechEnthusiasts />

      {/* Innovation */}
      <Innovation />
    </div>
  );
};

export default Home;