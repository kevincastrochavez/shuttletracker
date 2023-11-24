import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext({});
const LoginUpdateContext = createContext({});

/**
 * Provider for the components that need the Login functionality
 * @param {Any} children components passed
 * @returns {JSX.Element}
 */
export default function LoginProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <LoginUpdateContext.Provider value={{ setUser }}>
      <LoginContext.Provider value={{ user }}>{children}</LoginContext.Provider>
    </LoginUpdateContext.Provider>
  );
}

/**
 * Provides the user object
 * @returns {{user}}
 */
export function useUser() {
  const { user } = useLoginProvider('useUser');
  return { user };
}

/**
 * Sets the user object
 * @returns {{setUser}}
 */
export function useSetUser() {
  const { setUser } = useSetLoginProvider('useSetUser');
  return { setUser };
}

/* PRIVATE FUNCTIONS */

/**
 * Returns the LoginContext
 * @param {string} functionName - just for using in error reporting
 * @returns {{}}
 */
function useLoginProvider(functionName) {
  const data = useContext(LoginContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by LoginProvider`
    );
  return data;
}

/**
 * Enables making changes to the LoginContext (using the LoginUpdateContext)
 * @param {string} functionName - just for using in error reporting
 * @returns {{}}
 */
function useSetLoginProvider(functionName) {
  const data = useContext(LoginUpdateContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by LoginProvider`
    );
  return data;
}
