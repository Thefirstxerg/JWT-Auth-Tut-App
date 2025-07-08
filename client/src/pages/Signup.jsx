/**
 * Signup Component
 * 
 * Handles new user registration through a signup form.
 * Features:
 * - Email, username, and password validation
 * - User account creation with JWT token generation
 * - Automatic redirection to home page on successful signup
 * - Toast notifications for user feedback
 * - Form state management
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_ENDPOINTS, TOAST_CONFIG, ROUTES } from "../config/constants";

const Signup = () => {
  const navigate = useNavigate();
  
  // Form state management
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  
  const { email, password, username } = inputValue;

  /**
   * Handles input field changes and updates state
   * @param {Event} e - Input change event
   */
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  /**
   * Displays error toast notification
   * @param {string} err - Error message to display
   */
  const handleError = (err) =>
    toast.error(err, TOAST_CONFIG.ERROR);

  /**
   * Displays success toast notification
   * @param {string} msg - Success message to display
   */
  const handleSuccess = (msg) =>
    toast.success(msg, TOAST_CONFIG.SUCCESS);

  /**
   * Handles form submission for user registration
   * Sends signup request to server and handles response
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        API_ENDPOINTS.SIGNUP,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        // Redirect to home page after successful signup
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      handleError('Signup failed. Please try again.');
    }
    
    // Clear form fields after submission
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;