import React from "react";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import InitialRouter from "./Router/InitialRouter";
import HeaderComponent from "./Components/HeaderComponent";

const App = () => {
  const location = useLocation();
  const hideHeaderRoutes ='/'; 
  return (
    <div className="w-full font-Afacad">
        {!hideHeaderRoutes.includes(location.pathname) && <HeaderComponent />}
        <InitialRouter />
    </div>
  );
};

export default App;
