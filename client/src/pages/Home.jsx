/**
 * Home Component
 * 
 * Protected page that displays user dashboard after successful authentication.
 * Features:
 * - JWT token verification on page load
 * - Automatic redirection to login if user is not authenticated
 * - User welcome message with username
 * - Logout functionality
 * - Toast notifications for user feedback
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_ENDPOINTS, TOAST_CONFIG, ROUTES } from "../config/constants";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Displays error toast notification
   * @param {string} err - Error message to display
   */
  const handleError = (err) =>
    toast.error(err, TOAST_CONFIG.ERROR);

  /**
   * Effect hook to verify user authentication on component mount
   * Checks for valid JWT token and redirects if not authenticated
   */
  useEffect(() => {
    /**
     * Verifies user authentication by checking JWT token
     * Redirects to login if token is invalid or missing
     */
    const verifyCookie = async () => {
      console.log('Home component: Starting token verification...');
      console.log('Available cookies:', cookies);
      
      // If no token exists, redirect to login
      if (!cookies.token) {
        console.log('No token found in cookies, redirecting to login');
        setIsLoading(false);
        navigate(ROUTES.LOGIN);
        return;
      }
      
      console.log('Token found:', cookies.token);
      
      try {
        console.log('Sending verification request to:', API_ENDPOINTS.VERIFY);
        // Verify token with server
        const { data } = await axios.post(
          API_ENDPOINTS.VERIFY,
          {},
          { withCredentials: true }
        );
        
        console.log('Verification response:', data);
        const { status, user } = data;
        
        if (status) {
          console.log('Token verification successful, user:', user);
          setUsername(user);
          setIsLoading(false);
        } else {
          console.log('Token verification failed, redirecting to login');
          handleError('Session expired. Please login again.');
          // Token is invalid, redirect to login
          removeCookie("token");
          setTimeout(() => navigate(ROUTES.LOGIN), 1000);
        }
      } catch (error) {
        console.error('Token verification error:', error);
        console.error('Error details:', error.response?.data);
        handleError('Authentication failed. Please login again.');
        removeCookie("token");
        setTimeout(() => navigate(ROUTES.LOGIN), 1000);
      }
    };
    
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  /**
   * Handles user logout by removing token and redirecting to login
   */
  const Logout = () => {
    removeCookie("token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="home_page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h4>
            Welcome <span>{username}</span>
          </h4>
          <button onClick={Logout}>LOGOUT</button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;