// import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/LandingPage/Banner.css';

const Banner = () => {
    // const [scrollPosition, setScrollPosition] = useState(0);

    // const handleScroll = () => {
    //     const position = window.scrollY;
    //     setScrollPosition(position);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        // <div className="banner-container" style={{ transform: `translateY(-${scrollPosition / 2}px)` }}>
        <div className="banner-container" id="banner">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-100"
                style={{border: "none"}}
            >
                <source src="NUSTOLYMPIAD.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Banner;
