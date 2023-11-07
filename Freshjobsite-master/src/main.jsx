import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./pages/styles/login.css";
import { AuthProvider } from "../src/context/AuthContext";
import "./pages/styles/profile.css";
import "./pages/styles/candidates.css";
import "./pages/styles/jobcandidate.css";
import "./pages/styles/application.css";
import "./pages/styles/error.css";
import "./modals/style/jobalert.css";
import "./modals/style/setinterview.css";
import "./modals/style/comfirmation.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./redux/index.js";
import { Provider } from "react-redux";
const CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <div>
            <App />
          </div>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
