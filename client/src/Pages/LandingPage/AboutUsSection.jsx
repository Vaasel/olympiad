import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/AboutUsSection.css';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const AboutUsSection = () => {
  return (
    <div id="AboutUs">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-6">
              <div className="row">
                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src="images/event/e3.jpg"
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-6">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src="images/event/e1.jpg"
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                  <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                    <img
                      src="images/event/e2.jpg"
                      className="img-fluid"
                    />
                    <div className="img-overlay bg-dark"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12 order-1 order-md-2">
          <div className="section-title ml-lg-5">
            <h2 className="font-weight-normal mb-3" id="about-us-title">About Us</h2>
            <h4 className="title mb-4">
              Our mission is to make your life easier.
            </h4>
            <p className="text-muted mb-0">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit quod
              debitis praesentium pariatur temporibus ipsa, cum quidem obcaecati
              sunt?
            </p>
            <div className="row">
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0">
                  <SportsEsportsIcon className='icon-color'/>
                  &nbsp;Indoor Sports
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0">
                  <SportsCricketIcon className='icon-color'/>
                  &nbsp;Outdoor Sports
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0">
                    <EmojiEventsIcon className='icon-color'/>
                  &nbsp;Excitement Competition
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 mt-4 pt-2">
                <div className="media align-items-center rounded shadow p-3">
                  <h5 className="ml-3 mb-0">
                   <CelebrationIcon className='icon-color'/>
                      &nbsp;Social Events
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
