import React, { useContext } from "react";
import { message } from "antd";
import { loginUser } from "./api_functions";

const authContext = React.createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = React.useState(null);

  const signIn = (username, password, cb) => {
    loginUser(username, password).then(({ data: userData }) => {
      if (userData) {
        setUser(userData);
        cb();
      } else {
        message.error("Credenciales invalidas");
      }
    });
  };

  //const signout = cb => {
  //  return fakeAuth.signout(() => {
  //    setUser(null);
  //    cb();
  //  });
  //};

  return { user, signIn };
}

export function usePermitValidator(testPermit = []) {
  let auth = useContext(authContext);
  console.log(auth);
  const { permits } = auth.user;
  if (testPermit) {
    if (typeof testPermit === "string") {
      return permits.includes(testPermit);
    }
    for (let p of testPermit) {
      if (permits.includes(p)) {
        return true;
      }
    }
    return false;
  }
  return false;
}
