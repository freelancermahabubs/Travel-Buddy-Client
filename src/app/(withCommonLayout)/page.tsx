import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";

import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";

import SearchBar from "@/components/UI/SearchBar/SearchBar";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />

      <TopRatedDoctors />
    </>
  );
};

export default HomePage;
