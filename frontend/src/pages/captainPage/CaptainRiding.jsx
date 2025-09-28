import React, { lazy, Suspense, useEffect, useState } from 'react';

// Lazy load components
const FinishRide = lazy(() => import('../../components/captainComponents/FinishRide'));
const LiveRoute = lazy(() => import('../../components/LiveRoute'));
const ConfirmRidePanel = lazy(() => import('../../components/captainComponents/ConfirmRidePanel'));

const CaptainRiding = () => {
    // Initialize step from localStorage or default to 0
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem('captainRidingStep');
        return savedStep ? Number(savedStep) : 0;
    });

    // Update localStorage whenever step changes
    useEffect(() => {
        localStorage.setItem('captainRidingStep', step);
    }, [step]);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const steps = [
        <LiveRoute nextStep={nextStep} prevStep={prevStep} role="captain" />,
        <ConfirmRidePanel nextStep={nextStep} prevStep={prevStep} />,
        <FinishRide nextStep={nextStep} />
    ];

    return (
        <Suspense fallback={<div>Loading...</div>}> 
            <div className='h-[80%]'>
                {steps[step]}
            </div>
        </Suspense>
    );
};

export default CaptainRiding;
