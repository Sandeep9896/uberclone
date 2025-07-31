import React from 'react'

const LocationSearchPanel = (props) => {
<<<<<<< HEAD
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
=======
    
    // sample array for location
    const loction = [
        {
            address: "123 Main Street, Downtown, New York, NY 10001",
            lat: 40.7128,
            lng: -74.0060
        },
        {
            address: "456 Park Avenue, Midtown, Chicago, IL 60601",
            lat: 41.8781,
            lng: -87.6298
        },
        {
            address: "789 Ocean Drive, Miami Beach, FL 33139",
            lat: 25.7617,
            lng: -80.1918
        },
        {
            address: "321 Tech Boulevard, Silicon Valley, CA 94025",
            lat: 37.4419,
            lng: -122.1430
        },
        {
            address: "555 Pike Place, Downtown, Seattle, WA 98101",
            lat: 47.6062,
            lng: -122.3321
        }
    ]
    return (
        <div>
            {
                loction.map((location, index) => (
                    <div key={index} onClick={()=>{
                        props.setPanelOpen(false);
                        props.setVechilePanel(true);
                    }} className='flex gap-4 mx-3 p-2 justify-start border-2 rounded-lg border-white active:border-black items-center my-2'>
                        <h2 className='font-semibold flex items-center justify-center w-12 h-6'>
                            <i className="ri-map-pin-2-fill"></i>
                        </h2>
                        <h4 className='font-semibold'>{location.address}</h4>
                    </div>
                ))
            }
            <div className='flex gap-4 mx-3 p-2 justify-start border-2 rounded-lg border-white active:border-black items-center my-2' >
                <h2 className=' font-semibold flex items-center justify-center w-12 h-6  ' >
                    <i className="ri-map-pin-2-fill "></i>
                </h2>
                <h4 className='font-semibold' >24b near dominos, shop-23, yamuna nagar </h4>
            </div>
            
           
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
        </div>
    )
}

export default LocationSearchPanel