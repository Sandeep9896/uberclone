import React, { useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

// Lazy load components for code splitting
const LiveLocation = lazy(() => import('../../components/LiveLocation'));
const VehiclePanel = lazy(() => import('../../components/userComponents/VehiclePanel'));
const ConfirmRide = lazy(() => import('../../components/userComponents/ConfirmRide'));
const LookingForDiver = lazy(() => import('../../components/userComponents/LookingForDiver'));

const UserConfirmRide = () => {
    const vehicleImage = useSelector((state) => state.ride.vehicleImage);
    const vehicleType = useSelector((state) => state.ride.vehicleType);
    const pickupLocation = useSelector((state) => state.ride.pickupLocation);
    const dropLocation = useSelector((state) => state.ride.dropLocation);
    const fareDetails = useSelector((state) => state.ride.fareDetail);
    const userLocation = useSelector((state) => state.location.userLocation);

    const [step, setStep] = useState(0);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const steps = [
        <VehiclePanel nextStep={nextStep} />,
        <ConfirmRide
            nextStep={nextStep}
            prevStep={prevStep}
            vehicleImage={vehicleImage}
            vehicleType={vehicleType}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            fare={fareDetails}
        />,
        <LookingForDiver
            vehicleImage={vehicleImage}
            vehicleType={vehicleType}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            fare={fareDetails}
        />
    ];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className='h-[30vh]'>
                    <LiveLocation coords={userLocation} />
                </div>
                <div className='h-[40vh]'>
                    {steps[step]}
                </div>
            </div>
        </Suspense>
    )
}

export default UserConfirmRide