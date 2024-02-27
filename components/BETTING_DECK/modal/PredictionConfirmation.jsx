import React, { useEffect, useState } from "react";

const PredictionConfirmation = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 1500); // Popup will disappear after 1.5 seconds (1500 milliseconds)

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
    };
  }, [onClose]);

  return isVisible ? (
    <div className="prediction-confirmation-backgorund">
      <div className="prediction-confirmation-popup">{message}</div>
    </div>
  ) : null;
};

export default PredictionConfirmation;
