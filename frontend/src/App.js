import React from "react";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import Store from "./Store";
import InitialRouter from "./Router/InitialRouter";
import HeaderComponent from "./Components/HeaderComponent";

const App = () => {
  const location = useLocation();
  const hideHeaderRoutes ='/'; 
  return (
    <div className="w-full font-Afacad">
      <Provider store={Store}>
        {!hideHeaderRoutes.includes(location.pathname) && <HeaderComponent />}
        <InitialRouter />
      </Provider>
    </div>
  );
};

export default App;
