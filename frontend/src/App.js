import React from "react";
import InitialRouter from "./Router/InitialRouter";
import { Provider } from "react-redux";
import Store from "./Store";
const App = () => {
  return (
    <div className="w-full ">
      <Provider store={Store}>
        <InitialRouter />
      </Provider>
    </div>
  );
};

export default App;
