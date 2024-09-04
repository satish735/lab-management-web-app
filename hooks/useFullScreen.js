import { useState, useEffect } from 'react';

const useFullscreen = () => {
    // State to keep track of whether the document is in fullscreen mode
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Function to update the fullscreen state
    const handleFullscreenChange = () => {
        const fullscreenElement = document?.fullscreenElement
            ?? document?.webkitFullscreenElement
            ?? document?.mozFullScreenElement
            ?? document?.msFullscreenElement;

        setIsFullscreen(!!fullscreenElement); // Update state based on whether any fullscreen element exists
    };

    // Function to toggle fullscreen mode
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Request fullscreen if not already in fullscreen
            document?.documentElement?.requestFullscreen?.()  // Standard method
                ?? document?.documentElement?.mozRequestFullScreen?.() // Firefox
                ?? document?.documentElement?.webkitRequestFullscreen?.() // Chrome, Safari, Opera
                ?? document?.documentElement?.msRequestFullscreen?.(); // IE/Edge
        } else {
            // Exit fullscreen if already in fullscreen
            document?.exitFullscreen?.()  // Standard method
                ?? document?.mozCancelFullScreen?.() // Firefox
                ?? document?.webkitExitFullscreen?.() // Chrome, Safari, Opera
                ?? document?.msExitFullscreen?.(); // IE/Edge
        }
    };

    // Set up event listeners for fullscreen changes
    useEffect(() => {
        const fullscreenChangeHandler = () => handleFullscreenChange();

        // Attach event listeners
        document?.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document?.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
        document?.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
        document?.addEventListener('MSFullscreenChange', fullscreenChangeHandler);

        // Clean up event listeners when component unmounts
        return () => {
            document?.removeEventListener('fullscreenchange', fullscreenChangeHandler);
            document?.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
            document?.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
            document?.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
        };
    }, []);

    // Return state and function to control fullscreen
    return { isFullscreen, toggleFullscreen };
};

export default useFullscreen;
