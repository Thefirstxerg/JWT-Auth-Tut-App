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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_ENDPOINTS, TOAST_CONFIG, ROUTES } from "../config/constants";

const Home = () => {
  const navigate = useNavigate();
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
      
      try {
        console.log('Sending verification request to:', API_ENDPOINTS.VERIFY);
        // Verify token with server (token is sent automatically via httpOnly cookie)
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
          setIsLoading(false);
          setTimeout(() => navigate(ROUTES.LOGIN), 1000);
        }
      } catch (error) {
        console.error('Token verification error:', error);
        console.error('Error details:', error.response?.data);
        handleError('Authentication failed. Please login again.');
        setIsLoading(false);
        setTimeout(() => navigate(ROUTES.LOGIN), 1000);
      }
    };
    
    verifyCookie();
  }, [navigate]); // Removed cookies and removeCookie dependencies

  /**
   * Handles user logout by redirecting to login
   * Note: HTTP-only cookies are automatically cleared by the browser when expired
   * or can be cleared by setting a server endpoint for logout
   */
  const Logout = () => {
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