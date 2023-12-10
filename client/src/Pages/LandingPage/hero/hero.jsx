import "./hero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "./Img/banner-img.png";
import bannerBg from "./Img/bannerbg.png";
import b1 from "./Img/feature-bg-2.png";
import b2 from "./Img/seo-ball-1.png";
import b3 from "./Img/seo-half-cycle.png";
import b4 from "./Img/green-dot.png";
import b5 from "./Img/blue-half-cycle.png";
import b6 from "./Img/yellow-triangle.png";
import b7 from "./Img/service-half-cycle.png";
import b8 from "./Img/team-bg-triangle.png";

const Hero =()=>{
    return(
        <>
            <div className="hero-section hero" style={{backgroundImage: `url(${bannerBg})`}}>
                <div>
                    <div className="row">
                        <div className="col-lg-12 text-center zindex-1">
                            <h1 className="mb-3 h" id="HeroTitle">NUST<br></br> Olympiad 24'</h1>
                            <p className="mb-4 p">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum<br></br>dolore eu fugiat nulla pariatur.</p>
                            <a href="#" className="bt bt-secondary bt-lg">Register Now</a>
                            {/* Banner Image */}
                            <img className="img-fluid w-80 banner-image" src={banner} alt="banner-img"></img>
                        </div>
                    </div>
                </div>
                {/* Background Images */}
                <div id="scene">
                    <img class="img-fluid hero-bg-1 up-down-animation" src={b1} alt=""></img>
                    <img class="img-fluid hero-bg-2 left-right-animation" src={b2} alt=""></img>
                    <img class="img-fluid hero-bg-3 left-right-animation" src={b3} alt=""></img>
                    <img class="img-fluid hero-bg-4 up-down-animation" src={b4} alt=""></img>
                    <img class="img-fluid hero-bg-5 left-right-animation" src={b5} alt=""></img>
                    <img class="img-fluid hero-bg-6 up-down-animation" src={b2} alt=""></img>
                    <img class="img-fluid hero-bg-7 left-right-animation" src={b6} alt=""></img>
                    <img class="img-fluid hero-bg-8 up-down-animation" src={b7} alt=""></img>
                    <img class="img-fluid hero-bg-9 up-down-animation" src={b8} alt=""></img>
                </div>
            </div>
        </>
    )
}

export default Hero;