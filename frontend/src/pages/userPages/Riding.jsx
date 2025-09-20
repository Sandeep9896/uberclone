import React, { useEffect, useState, lazy, Suspense } from 'react';
import { setLiveRoute } from '../../slices/locationSlice';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../context/SocketContext';

// Lazy load components
const LiveRoute = lazy(() => import('../../components/LiveRoute'));
const WaitingForDriver = lazy(() => import('../../components/userComponents/WaitingForDriver'));
const RideEnd = lazy(() => import('../../components/userComponents/RideEnd'));

const Riding = () => {
    const dispatch = useDispatch();
    const { receiveMessage } = useSocket();
    const [step, setStep] = useState(0);
    const nextStep = () => setStep(1);
    const prevStep = () => setStep(0);
    console.log("Riding component rendered", step);

    useEffect(() => {
        const unsubscribe = receiveMessage('live-route', (data) => {
            console.log('Live route updated:', data);
            dispatch(setLiveRoute(data));
        });

        return () => {
            unsubscribe();
        };
    }, [receiveMessage, dispatch]);

    const steps = [
        <WaitingForDriver nextStep={nextStep} />,
        <RideEnd />
    ];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full h-[40vh] rounded-2xl">
                <LiveRoute role="user" />
            </div>
            <div className="w-full mt-5 h-[50vh]">
                {steps[step]}
            </div>
        </Suspense>
    );
};

export default Riding;