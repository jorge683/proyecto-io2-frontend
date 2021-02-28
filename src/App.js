import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/es_ES";
import "./styles/app.global.css";

import { LoginScreen } from "./Components/Login";
import DashboardScreen from "./Components/DashboardScreen";
import UserScreen from "./Components/User/UserScreen";
import RoleScreen from "./Components/Role/RoleScreen";

export default function App() {
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/users" component={UserScreen} />
          <Route path="/roles" component={RoleScreen} />
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

const Login = () => {
  return (
    <div className="App">
      <LoginScreen />
    </div>
  );
};
