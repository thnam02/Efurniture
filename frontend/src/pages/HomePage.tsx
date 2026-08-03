import { Hero } from "../components/Hero";
import { FeaturedCategories } from "../components/FeaturedCategories";
import { AboutWorkshop } from "../components/AboutWorkshop";
import { PopularProducts } from "../components/PopularProducts";
import { CustomFurniture } from "../components/CustomFurniture";
import { ProjectsGallery } from "../components/ProjectsGallery";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Testimonials } from "../components/Testimonials";
import { Blog } from "../components/Blog";

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <AboutWorkshop />
      <PopularProducts />
      <CustomFurniture />
      <ProjectsGallery />
      <WhyChooseUs />
      <Testimonials />
      <Blog />
    </>
  );
}
