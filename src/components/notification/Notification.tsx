"use cli";
import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info"; // Notification types
  duration?: number; // Optional: Auto-dismiss duration in milliseconds
  onClose: () => void; // Callback when notification is dismissed
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 3000, // Default duration: 3 seconds
  onClose,
}) => {
  useEffect(() => {
    // Auto-dismiss the notification after the specified duration
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center px-4 py-2 rounded shadow-lg ${typeStyles[type]}`}
    >
      <span className="mr-2 font-semibold">{type.toUpperCase()}:</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-sm underline hover:text-gray-200 focus:outline-none"
      >
        Dismiss
      </button>
    </div>
  );
};

export default Notification;
