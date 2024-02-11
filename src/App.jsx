// Importing necessary assets and components
// import MAsjidLogo from "./assets/Images/MasjidLogo.png";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importing styles (CSS file is commented out)
// import "./App.css";

// Importing custom components for routing
import Login from "./assets/Login/Login";
import Dashboard from "./assets/Dasboard/Dashboard";

// Custom component for handling unmatched routes
// This component will be rendered when a user tries to access a path that does not match any defined routes
const NotFound = () => (
  <div style={{ marginLeft: "30px", marginTop: "30px" }}>
    <h2>404 - Not Found</h2>
    <p>Sorry, the requested page does not exist or is forbidden.</p>
    
  </div>
);

function App() {
  return (
    <>
      {/* Setting up the application's navigation using BrowserRouter */}
      <BrowserRouter>
        {/* Defining the route structure using the Routes component */}
        <Routes>
          {/* Route for the login page */}
          <Route path='/' element={<Login />} />
          
          {/* Route for the dashboard page */}
          <Route path='dashboard' element={<Dashboard />} />
          
          {/* 
            Catch-all route for unmatched paths (Validation)
            This route ensures that if a user accesses a path that doesn't match any defined routes, 
            the NotFound component will be rendered, providing a 404 error message.
          */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Exporting the main App component
export default App;
