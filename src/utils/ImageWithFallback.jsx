import React from 'react';
import { createRoot } from 'react-dom/client';

// Utility function to convert an SVG to base64
const svgToBase64 = (svgElement) => {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const ImageWithFallback = ({ image = {}, title = 'Default' }) => {
    const handleImageError = (e) => {
        const svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                width="200"
                height="200"
                fill="none"
            >
                <rect width="200" height="200" fill="#f3f4f6" rx="16" />
                <line
                    x1="50"
                    y1="50"
                    x2="150"
                    y2="150"
                    stroke="#d1d5db"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <line
                    x1="150"
                    y1="50"
                    x2="50"
                    y2="150"
                    stroke="#d1d5db"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <text
                    x="50%"
                    y="180"
                    fill="#6b7280"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    textAnchor="middle"
                >
                    {title} Not Available
                </text>
            </svg>
        );

        // Use a container to render the SVG
        const container = document.createElement('div');
        const root = createRoot(container); // Use createRoot
        root.render(svg);

        const dataUrl = svgToBase64(container.firstChild);

        e.target.onerror = null; // Prevent further errors
        e.target.src = dataUrl;
    };

    return (
        <img
            src={image.src || '/path/to/default-image.jpg'} // Fallback for missing `src`
            alt={image.category || 'Image not available'} // Fallback for missing `alt`
            onError={handleImageError}
        />
    );
};

export default ImageWithFallback;
