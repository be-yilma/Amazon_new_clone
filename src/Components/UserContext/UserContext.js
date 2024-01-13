import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  console.log(useUser);
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signIn = (email, password) => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setUser({ email }); //  Assuming login is successful
    setError(null); // Clear any previous errors
  };

  const register = (email, password) => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setUser({ email }); // Assuming registration is successful
    setError(null); // Clear any previous errors
  };

  return (
    <UserContext.Provider value={{ user, signIn, register, error }}>
      {children}
    </UserContext.Provider>
  );
}
