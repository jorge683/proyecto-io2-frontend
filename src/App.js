import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/es_ES";
import "./styles/app.global.css";

import { LoginScreen } from "./Components/Login";
import DashboardScreen from "./Components/DashboardScreen";
import UserScreen from "./Components/User/UserScreen";
import RoleScreen from "./Components/Role/RoleScreen";
import { ProvideAuth, useAuth } from "./auth_functions";

export default function App() {
  return (
    <ConfigProvider locale={locale}>
      <ProvideAuth>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/users">
              <UserScreen />
            </PrivateRoute>
            <PrivateRoute path="/roles">
              <RoleScreen />
            </PrivateRoute>
            <PrivateRoute path="/">
              <DashboardScreen />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </ProvideAuth>
    </ConfigProvider>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.log(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Login = () => {
  return (
    <div className="App">
      <LoginScreen />
    </div>
  );
};
