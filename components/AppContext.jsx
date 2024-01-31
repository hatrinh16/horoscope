import { createContext, useState } from "react";

const AppContext = createContext();

const AppDisptachContext = createContext();

const AppProvider = ({ children }) => {
  const [date, setDate] = useState();

  return (
    <AppContext.Provider value={date}>
      <AppDisptachContext.Provider value={setDate}>
        {children}
      </AppDisptachContext.Provider>
    </AppContext.Provider>
  );
};

export { AppContext, AppDisptachContext, AppProvider };
