import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUsSection from './AboutUsSection';
import Hero from './hero/hero';
import Footer from './footer/footer';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AboutUsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
