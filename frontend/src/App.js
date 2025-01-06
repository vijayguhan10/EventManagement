import React, { useEffect } from "react";
import InitialRouter from "./Router/InitialRouter";
import { Provider } from "react-redux";
import Store from "./Store";

const App = () => {
  useEffect(() => {
    const forms = {
      Eventform: {},
      transportform: {},
      amenityform: {},
      guestroomform: {},
    };

    if (!localStorage.getItem("forms")) {
      localStorage.setItem("forms", JSON.stringify(forms));
      console.log("LocalStorage initialized with forms object.");
    }
  }, []); 

  return (
    <div className="w-full">
      <Provider store={Store}>
        <InitialRouter />
      </Provider>
    </div>
  );
};

export default App;
