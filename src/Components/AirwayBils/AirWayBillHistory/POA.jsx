import moment from 'moment';
import React, { useState } from 'react';
import.meta.env.VITE_IMAGE_STORAGE_API
const POA = ({ AwbDetails, }) => {
    const [activeFilter, setActiveFilter] = useState('Attempt 1');

    const images = [
        { id: 1, src: `${process.env.VITE_IMAGE_STORAGE_API}${moment(AwbDetails.StatusDate).format("YYYY-MM-DD")}/${AwbDetails.Awbno}/image1.jpg`, category: 'Attempt 1' },
        { id: 2, src: `${process.env.VITE_IMAGE_STORAGE_API}${moment(AwbDetails.StatusDate).format("YYYY-MM-DD")}/${AwbDetails.Awbno}/image2.jpg`, category: 'Attempt 2' },
    ];

    const filters = ['Attempt 1', 'Attempt 2'];

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const filteredImages = images.filter((image) => image.category === activeFilter);
    return (

        <div className="container">
            <div>
                <div className='tab-buttons transaction d-inline-flex pod-tab'>
                    {filters.map((filter) => (
                        <div
                            key={filter}
                            className={`headtab  ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            <h6 className="text-dark headtab">
                                {filter.charAt(0).toUpperCase() + filter.slice(1)} </h6>

                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                {filteredImages.map((image) => (
                    <div key={image.id} className={`gallery_product col-md-4 filter `}>
                        <img src={image.src} alt={image.category} onError={(e) => e.target.src = "/not-available.svg"} />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default POA;
