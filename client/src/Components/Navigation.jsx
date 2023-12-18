import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Navigation.css';
import logo from '../Images/logo/logo_without_text.png';


const Navigation = () => {

    return(
        <>
        <nav className={`navbar nav2 navbar-expand-lg pl-5 pr-5 `} style={{ backgroundColor: 'transparent' }}>
        <a className="navbar-brand" href="/">
            <img src={logo} alt="logo" classNameName="logo"  width={100} />
        </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent: 'end'}}>
    {/* <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <a className="nav-link" href="#banner">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#AboutUs">About</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#team">Team</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#sponsors">Sponsors</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#contact">Contact</a>
      </li>
    </ul> */}
    <div >
    <a href="/login"><button className="btn my-2 my-sm-0 outlinedBtn">Login</button></a>
    <a href="/signup"><button className="btn  my-2 my-sm-0 filledBtn" >Register</button></a>
    </div>
  </div>
    	</nav>
        </>
    );
}

export default Navigation;