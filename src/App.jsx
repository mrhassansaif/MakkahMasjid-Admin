import MAsjidLogo from "./assets/Images/MasjidLogo.png";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import "./App.css";
import Login from "./assets/Login/Login";
import Dashboard from "./assets/Dasboard/Dashboard";



function App() {
  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />} />  
        <Route path='dashboard' element = {<Dashboard />} />
      </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;
