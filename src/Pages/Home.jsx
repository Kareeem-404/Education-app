/**
 * Home page component - The main landing page of the application.
 * Displays the hero section with introductory content.
 */

//================Components===========

import FrontEndSection from "../Components/FrontEndSection/FrontEnd";
import HeroSection from "../Components/HeroSectio/HeroSection";

export default function Home() {
  return (
    <>
      {/* Hero section with welcome message and call-to-action buttons */}
      <HeroSection />
      <FrontEndSection />
    </>
  );
}
