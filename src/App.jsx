import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import FullPageSroll from "./components/FullPageSroll";

const App = () => {
  return (
    <Provider store={store}>
      <FullPageSroll />
    </Provider>
  );
};

export default App;
