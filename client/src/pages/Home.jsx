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
      // Redirect to login if no token exists
      if (!cookies.token) {
        navigate(ROUTES.LOGIN);
      }
      
      try {
        // Verify token with server
        const { data } = await axios.post(
          API_ENDPOINTS.VERIFY,
          {},
          { withCredentials: true }
        );
        
        const { status, user } = data;
        setUsername(user);
        
        // Show welcome message or redirect to login
        return status
          ? toast(`Hello ${user}`, TOAST_CONFIG.SUCCESS)
          : (removeCookie("token"), navigate(ROUTES.LOGIN));
      } catch (error) {
        console.error('Token verification error:', error);
        removeCookie("token");
        navigate(ROUTES.LOGIN);
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
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;