import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";


import TopTravels from "@/components/UI/HomePage/TopTravels/TopTravels";

import SearchBar from "@/components/UI/SearchBar/SearchBar";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />

      <TopTravels />
    </>
  );
};

export default HomePage;
