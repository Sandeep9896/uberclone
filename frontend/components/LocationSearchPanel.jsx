import React from 'react'

const LocationSearchPanel = (props) => {
    const locations = props.suggestions && props.suggestions.length > 0
        ? props.suggestions : [];

    return (
        <div
            style={{
                maxHeight: '100%', // Set the height you want
                overflowY: 'auto',  // Enable vertical scrolling
            }}
        >
            {locations.length === 0 ? (
                <div className='flex items-center justify-center h-32'>
                    <h2 className='text-gray-500'>No suggestions found</h2>
                </div>
            ) : null}
            {locations.map((location, index) => (
                <div key={index}
                    onClick={() => {
                        props.setPanelOpen(true);
                        if (props.onSelect) props.onSelect(location);
                    }}
                    className='flex gap-4 mx-3 p-2 justify-start border-2 rounded-lg border-white active:border-black items-center my-2'
                >
                    <h2 className='font-semibold flex items-center justify-center w-12 h-6'>
                        <i className="ri-map-pin-2-fill"></i>
                    </h2>
                    <h4 className='font-semibold'>{location.address || location.name}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel