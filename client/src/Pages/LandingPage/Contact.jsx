import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/Contact.css';
import bgVideo from '../../Images/mp4/bg.mp4';

const Contact = () => {
    return (
        <>


        <div className="masthead">
        <video className="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src={bgVideo} type="video/mp4" /></video>
            <div className="masthead-content text-white">
                <div className="container-fluid px-4 px-lg-0"  style={{ textAlign: 'center' }}>
                    <h1 className="fst-italic lh-1 mb-4">Contact Us</h1>
                    <p>If you have any query, feel free to reach out to us</p>

                    <button className="btn btn-primary" id="submitButton">Contact@olympiad.nust.edu.pk</button>
                    {/* <form id="contactForm" data-sb-form-api-token="API_TOKEN"> */}
                        {/* <div className="invalid-feedback mt-2" data-sb-feedback="email:required">An email is required.</div>
                        <div className="invalid-feedback mt-2" data-sb-feedback="email:email">Email is not valid.</div> */}

                        {/* <div className="d-none" id="submitSuccessMessage">
                            <div className="text-center mb-3 mt-2">
                                <div className="fw-bolder">Form submission successful!</div>
                                To activate this form, sign up at
                                <br />
                                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                        </div> */}

                        {/* <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3 mt-2">Error sending message!</div></div> */}
                    {/* </form> */}
                </div>
            </div>
        </div>

        {/* <div className="social-icons">
            <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
                <a className="btn btn-dark m-3" href="#!"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-dark m-3" href="#!"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-dark m-3" href="#!"><i className="fab fa-instagram"></i></a>
            </div>
        </div> */}
        </>
    );
}

export default Contact;