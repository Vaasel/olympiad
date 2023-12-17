import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/Nav.css';


const Nav = () => {


    // window.addEventListener('DOMContentLoaded', event => {

    //     // Navbar shrink function
    //     var navbarShrink = function () {
    //         const navbarCollapsible = document.body.querySelector('#mainNav');
    //         if (!navbarCollapsible) {
    //             return;
    //         }
    //         if (window.scrollY === 0) {
    //             navbarCollapsible.classList.remove('navbar-shrink')
    //         } else {
    //             navbarCollapsible.classList.add('navbar-shrink')
    //         }
    
    //     };
    
    //     // Shrink the navbar 
    //     navbarShrink();
    
    //     // Shrink the navbar when page is scrolled
    //     document.addEventListener('scroll', navbarShrink);
    
    //     //  Activate Bootstrap scrollspy on the main nav element
    //     const mainNav = document.body.querySelector('#mainNav');
    //     // if (mainNav) {
    //     //     new bootstrap.ScrollSpy(document.body, {
    //     //         target: '#mainNav',
    //     //         rootMargin: '0px 0px -40%',
    //     //     });
    //     // };
    
    //     // Collapse responsive navbar when toggler is visible
    //     const navbarToggler = document.body.querySelector('.navbar-toggler');
    //     const responsiveNavItems = [].slice.call(
    //         document.querySelectorAll('#navbarResponsive .nav-link')
    //     );
    //     responsiveNavItems.map(function (responsiveNavItem) {
    //         responsiveNavItem.addEventListener('click', () => {
    //             if (window.getComputedStyle(navbarToggler).display !== 'none') {
    //                 navbarToggler.click();
    //             }
    //         });
    //     });
    
    // });
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Nav;