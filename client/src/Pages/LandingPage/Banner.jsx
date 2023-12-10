import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    return (
        <div>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-100"  // This class ensures that the video takes up 100% width of its container
            >
                <source src="NUSTOLYMPIAD.mp4" type="video/mp4" />
                {/* Add additional source elements for different video formats if needed */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Banner;
