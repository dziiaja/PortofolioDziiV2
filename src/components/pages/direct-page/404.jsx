import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <p className="text-gray-300">Redirecting to home page...</p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;