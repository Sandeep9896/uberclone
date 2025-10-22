import React, { useState, lazy, Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';
import { setPickupLocation, setDropLocation, setFareDetail,setVehicleImage, setVehicleType  } from '../../slices/rideSlice';

// Lazy load components
const VehiclePanel = lazy(() => import('../../components/userComponents/VehiclePanel'));
const ConfirmRide = lazy(() => import('../../components/userComponents/ConfirmRide'));
const LookingForDiver = lazy(() => import('../../components/userComponents/LookingForDiver'));


const UserConfirmRide = () => {
    const dispatch = useDispatch();
    const vehicleImage = useSelector((state) => state.ride.vehicleImage);
    const vehicleType = useSelector((state) => state.ride.vehicleType);
    const pickupLocation = useSelector((state) => state.ride.pickupLocation);
    const dropLocation = useSelector((state) => state.ride.dropLocation);
    const fareDetails = useSelector((state) => state.ride.fareDetail);

    useEffect(() => {
        if (!pickupLocation || !dropLocation || !fareDetails || !vehicleType || !vehicleImage) {
            const { pickupLocation, dropLocation, fareDetails } = JSON.parse(localStorage.getItem("rideDetail")) || {};
            const { type, image } = JSON.parse(localStorage.getItem("vehicleDetail")) || {};
            dispatch(setPickupLocation(pickupLocation));
            dispatch(setDropLocation(dropLocation));
            dispatch(setFareDetail(fareDetails));
            dispatch(setVehicleType(type));
            dispatch(setVehicleImage(image));
        }
    }, []);

    // Load step from localStorage, default = 0
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem("confirmRideStep");
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const containerRef = useRef(null);

    // Save step in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("confirmRideStep", step);
    }, [step]);
    useEffect(() => {
        return () => {
            localStorage.setItem("confirmRideStep", 0);
        };
    }, []);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const steps = [
        <VehiclePanel key="vehicle" nextStep={nextStep} />,
        <ConfirmRide
            key="confirm"
            nextStep={nextStep}
            prevStep={prevStep}
            vehicleImage={vehicleImage}
            vehicleType={vehicleType}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            fare={fareDetails}
        />,
        <LookingForDiver
            key="looking"
            vehicleImage={vehicleImage}
            vehicleType={vehicleType}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            fare={fareDetails}
        />,
    ];

    // GSAP Animation when step changes
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [step]);

    return (

        <div ref={containerRef} className="h-full p-5 ">
            {steps[step]}
        </div>

    );
};

export default UserConfirmRide;
