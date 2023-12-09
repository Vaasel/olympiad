import './footer.css';
import "bootstrap/dist/css/bootstrap.min.css";
import footerBg from './Img/footer-bg.png';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer= ()=>{
    return(
        <>
            <div className="footer-section footer" style={{backgroundImage: `url(${footerBg})`}} >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 text-center text-lg-left mb-40 mb-lg-0">
                            {/* Logo */}
                            <a href="sr">
                            <img className="img-fluid" src="" alt="logo"></img>
                            </a>
                        </div>

                        {/* Icons */}
                        <nav className="col-12">
                            <ul className="list-inline text-lg-right text-center social-icon">
                                <li class="list-inline-item">
                                    <a className="facebook logo1-1" href="se"><FaFacebookSquare className="logo1"/></a>
                                </li>
                                <li class="list-inline-item">
                                    <a className="twitter logo1-1" href="se"><FaInstagram className="logo1"/></a>
                                </li>
                                <li class="list-inline-item">
                                    <a className="black logo1-1" href="se"><FaXTwitter className="logo1"/></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;