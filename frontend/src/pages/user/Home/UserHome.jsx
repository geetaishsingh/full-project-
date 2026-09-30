import { useOutletContext } from "react-router-dom";
import Hero from "../../../components/Hero/Hero";
import FeaturesSection from "../../../components/FeaturesSection/FeaturesSection";
import TrendingSection from "../../../components/TrendingSection/TrendingSection";
import TestimonialsSection from "../../../components/TestimonialsSection/TestimonialsSection";

function UserHome() {
  const { user } = useOutletContext();

  return (
    <>
      <Hero user={user} />
      <FeaturesSection />
      <TrendingSection />
      <TestimonialsSection />
    </>
  );
}

export default UserHome;
