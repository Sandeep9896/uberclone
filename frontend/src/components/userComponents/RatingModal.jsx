import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from 'react-router-dom';
import { RiStarFill, RiStarLine } from "react-icons/ri";
import axios from "axios";
import { useSelector } from "react-redux";

const RatingModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
   const ride = useSelector((state) => state.ride.ride);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // GSAP animation
    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    const handleSubmit = async () => {


        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }
        try {
            const response = await axios.post('/api/rides/submit-rating', {
                captainId: ride.captain?._id,
                rating,
                comment: feedback
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'}
            }
        );
        } catch (error) {
            console.error('Submit rating error:', error);
        }

        onSubmit({ rating, feedback });
        setRating(0);
        setFeedback("");
        onClose();
        navigate('/user/home');
 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md mx-auto"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Rate Your Ride</h2>

                {/* Star rating */}
                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className="text-yellow-400 text-3xl transition-transform transform hover:scale-125"
                        >
                            {star <= (hover || rating) ? <RiStarFill /> : <RiStarLine />}
                        </button>
                    ))}
                </div>

                {/* Feedback */}
                <textarea
                    className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    rows={3}
                    placeholder="Leave feedback (optional)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"

                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
