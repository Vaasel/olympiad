import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/LandingPage/EC.css";
import Nimrah from "../../Images/EC/Nimra.jpeg";
import Akbar from "../../Images/EC/Akbar.jpg";
import Ahmad from "../../Images/EC/Ahmad.JPG";

const EC = () => {
  return (
    <>
        <section className="page-section bg-light" id="team">
            <div className="pr-5 pl-5 pt-0 pb-0">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase text-center">Organizing Committee</h2>
                    <h3 className="section-subheading text-muted">A team that done it all</h3>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src={Ahmad} alt="..." />
                            <h4>Ahmad Ayub</h4>
                            <p className="text-muted text-center">VP Outreach</p>
                            {/* <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a> */}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src={Nimrah} alt="..." />
                            <h4>Nimrah Abaidullah</h4>
                            <p className="text-muted text-center">VP Coord</p>
                            {/* <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a> */}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src={Akbar} alt="..." />
                            <h4>Akbar Khan Zada</h4>
                            <p className="text-muted text-center">VP Resources</p>
                            {/* <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a> */}
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                </div> */}
            </div>
        </section>
    </>
  );
}

export default EC;