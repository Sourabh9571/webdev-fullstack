import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  loginfun: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  async function loginfun(inputs) {
    //TO DO
    try {
      console.log(inputs);
      const res = await axios.post(
        "http://localhost:8888/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
      console.log(currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loginfun }}>
      {children}
    </AuthContext.Provider>
  );
};
