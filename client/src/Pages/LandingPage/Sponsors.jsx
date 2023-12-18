import React from "react";
import { Rerousel } from "rerousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/LandingPage/Sponsors.css";
import vaasel from "../../Images/sponsors/vaasel.png";
import pizzz from "../../Images/sponsors/pizzz.png";
import CP from "../../Images/sponsors/CP.png";
import GB from "../../Images/sponsors/GB.png";
import cakes from '../../Images/sponsors/cakes.png';
import jahangir from '../../Images/sponsors/jahangir.png';

const Sponsors = () => {
  return (
    <>
      <div className="px-5" id="sponsors">
        <div>
          <div className="row align-items-center">
            <div className="col-md-2 col-sm-3 my-3">

                <img
                  className="img-fluid d-block mx-auto"
                  src={pizzz}
                  alt="..."
                  aria-label="Microsoft Logo"
                />

            </div>
            <div className="col-md-2 col-sm-3 my-3">
  
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={CP}
                  alt="..."
                  aria-label="Google Logo"
                />

            </div>
            <div className="col-md-2 col-sm-3 my-3">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={vaasel}
                  alt="..."
                  aria-label="Facebook Logo"
                />

            </div>
            <div className="col-md-2 col-sm-3 my-3">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={GB}
                  alt="..."
                  aria-label="IBM Logo"
                />
            </div>

            <div className="col-md-2 col-sm-3 my-3">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={cakes}
                  alt="..."
                  aria-label="IBM Logo"
                />
            </div>

            <div className="col-md-2 col-sm-3 my-3">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={jahangir}
                  alt="..."
                  aria-label="IBM Logo"
                />
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
