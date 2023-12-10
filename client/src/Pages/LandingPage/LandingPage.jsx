import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUsSection from './AboutUsSection';
import Hero from './hero/hero';
import Footer from './footer/footer';
import Banner from './Banner';

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <AboutUsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
