import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState, useContext } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import { LocationContext } from "../context/LocationContext.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LiveRoute(props) {
    // const { userCoords, captainCoords } = useContext(LocationContext);
    const captainCoords = useSelector((state) => state.location.captainLocation);
    const userCoords = useSelector((state) => state.location.userLocation);
    const [viewState, setViewState] = useState({
        longitude: captainCoords?.lng ,
        latitude: captainCoords?.lat ,
        zoom: 11,
    });
    const [route, setRoute] = useState(props.liveRoute?.ride?.route);
    const [distance, setDistance] = useState(props.liveRoute?.ride?.distanceKm);
    useEffect(() => {
        setRoute(props.liveRoute?.ride?.route);
        setDistance(props.liveRoute?.ride?.distanceKm);
        setViewState({
            longitude: props.liveRoute?.ride?.captainCoords?.lng,
            latitude: props.liveRoute?.ride?.captainCoords?.lat,
            zoom: 11,
        });
    }, [props.liveRoute]);

    return (
        <div>

            <div className='h-screen w-full'>
                <div className='fixed w-full top-0 flex justify-between items-center mb-5 '>
                     <img className=' w-16 ' src="images\uber.png" alt="" />
                    <Link to="/captains/logout" className='h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg'>
                        <i className="tetx-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
                <div className='h-3/4 mt-2 mx-2 rounded-2xl'>
                {props.liveRoute.ride && (<Map
                        {...viewState}
                        onMove={(evt) => setViewState(evt.viewState)}
                        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                        style={{ width: "100%", height: "100%" }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                    >
                        {/* Captain Marker */}
                        {captainCoords && (
                            <Marker longitude={captainCoords.lng} latitude={captainCoords.lat} color="blue" />
                        )}

                        {/* User Marker: prefer context userCoords but fallback to liveRoute prop */}
                        {((userCoords && userCoords.lng && userCoords.lat) || props.liveRoute?.ride?.userCoords) && (
                            <Marker
                                longitude={(userCoords?.lng ?? props.liveRoute?.ride?.userCoords?.lng) || 77.23}
                                latitude={(userCoords?.lat ?? props.liveRoute?.ride?.userCoords?.lat) || 28.65}
                                color="red"
                            />
                        )}

                        {/* Route line */}
                        {route && (
                            <Source id="routeSource" type="geojson" data={route}>
                                <Layer
                                    id="routeLayer"
                                    type="line"
                                    source="routeSource"
                                    layout={{ "line-cap": "round", "line-join": "round" }}
                                    paint={{ "line-color": "#1DA1F2", "line-width": 5 }}
                                />
                            </Source>
                        )}
                    </Map>
                )}
                </div>
                <div className='h-1/5 p-5 bg-yellow-400 flex relative justify-between items-center'>
                    <h5
                        onClick={() => {
                            props.setLiveRoutePopup(false);
                        }}
                        className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                        <i className="ri-arrow-up-wide-line"></i>
                    </h5>
                    <h4 className='text-xl font-semibold'>{distance} away</h4>
                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(true);
                             props.setLiveRoutePopup(false);
                        }}
                        className=' bg-green-600 text-white font-semibold rounded-lg px-10 p-3' > Reached to User </button>
                </div>

            </div>
        </div>
    );
}
