import MAsjidLogo from "./assets/Images/MasjidLogo.png";
import "./App.css";
import Login from "./assets/Login/Login";
import Dashboard from "./assets/Dasboard/Dashboard";

// function Home() {
//   return (
//     <>
//       <div>
//         <div>
//           <a href="https://makkahmasjid.net" target="_blank">
//             <img src={MAsjidLogo} className="logo" alt="Masjis logo" />
//           </a>
//         </div>
//         <h1>Welcome To Makkah Masjid</h1>
//         <div className="card">
//           <button> Login </button>
//           {/* <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p> */}
//         </div>
//         <p className="read-the-docs">
//           If you arent Suppsode to be here go to Makkamasjid.net
//         </p>
//       </div>
//       <Login />
//     </>
//   );
// }

// export default App;
function App() {
  return (
    <>
    <Login />
      {/* <Dashboard /> */}
      
    </>
  );
}

export default App;
