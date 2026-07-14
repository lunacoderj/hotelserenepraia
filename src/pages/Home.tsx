import React from 'react';
import { useScrollTrigger, useLenisScroll } from '../hooks';
import { Hero } from '../components/sections/Hero';
import { QuickBooking } from '../components/sections/QuickBooking';
import { About } from '../components/sections/About';
import { LocationMap } from '../components/sections/LocationMap';
import { FeaturedRooms } from '../components/sections/FeaturedRooms';
import { Amenities } from '../components/sections/Amenities';
import { DiscoverMore } from '../components/sections/DiscoverMore';
import { AttractionsCarousel } from '../components/sections/AttractionsCarousel';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home = () => {
  useLenisScroll();
  useScrollTrigger();

  return (
    <div className="bg-pearl min-h-screen">
      <Hero />
      <QuickBooking />
      <About />
      <LocationMap />
      <FeaturedRooms />
      <Amenities />
      <DiscoverMore />
      <AttractionsCarousel />
      <FinalCTA />
    </div>
  );
};

export default Home;
