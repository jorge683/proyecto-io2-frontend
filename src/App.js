import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/es_ES";
import "./styles/app.global.css";

import { LoginScreen } from "./components/Login";
import DashboardScreen from "./components/DashboardScreen";
import UserScreen from "./components/User/UserScreen";
import RoleScreen from "./components/Role/RoleScreen";
import ProjectScreen from "./components/Project/ProjectScreen";
import { ProvideAuth, useAuth } from "./auth_functions";
import TaskScreen from "./components/Task/TaskScreen";

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
            <PrivateRoute path="/projects">
              <ProjectScreen />
            </PrivateRoute>
            <PrivateRoute path="/tasks">
              <TaskScreen />
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
