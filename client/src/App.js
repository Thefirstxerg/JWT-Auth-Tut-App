/**
 * Main App Component
 * 
 * Root component that handles application routing.
 * Defines the main routes for the JWT authentication application:
 * - Home page (protected route)
 * - Login page
 * - Signup page
 */

import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;