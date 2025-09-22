import React, { lazy, Suspense } from 'react';

// Lazy load components
const FinishRide = lazy(() => import('../../components/captainComponents/FinishRide'));
const LiveRoute = lazy(() => import('../../components/LiveRoute'));
const ConfirmRidePanel = lazy(() => import('../../components/captainComponents/ConfirmRidePanel'));

const CaptainRiding = () => {
    const [step, setStep] = React.useState(0);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const steps = [
        <LiveRoute nextStep={nextStep} prevStep={prevStep} role="captain" />,
        <ConfirmRidePanel nextStep={nextStep} prevStep={prevStep} />,
        <FinishRide nextStep={nextStep} />
    ];

    return (
    <Suspense fallback={<div>Loading...</div>}> 
            <div className='h-[80%]  '>
                {steps[step]}
            </div>
        </Suspense>
    );
};

export default CaptainRiding;