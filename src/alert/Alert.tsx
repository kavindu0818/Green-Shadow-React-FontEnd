import React from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const alertStyles = type === 'success'
        ? 'bg-red-700 text-white'
        : 'bg-red-500 text-white';

    return (
        <div className={`fixed top-4 left-1/2 p-4 rounded-lg shadow-lg ${alertStyles}`} role="alert">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
            </div>
        </div>
    );
};

export default Alert;
