import "./styles/app.global.css";

import { LoginScreen } from "./Login";

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "grey" }}>
        Este es el header
      </header>
      <LoginScreen />
    </div>
  );
}

export default App;
