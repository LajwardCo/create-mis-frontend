import React from "react";
import ReactDOM from "react-dom";
import "./index.{{CSS_EXTENSION}}";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const DevWrapper = () => (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(<DevWrapper />, document.getElementById("app"));

