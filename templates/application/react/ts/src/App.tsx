import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { getJWT } from "./shared";

function Home() {
    const jwt = getJWT();
    return (
        <div>
            <h1>Home</h1>
            <p>JWT: {jwt}</p>
        </div>
    );
}

function Page1() {
  return <h1>Page1</h1>;
}

function Page2() {
  return <h1>Page2</h1>;
}

function passRoutesToBase() {
    const routes = [
        {title: "Home", route: ""},
        {title: "Page1", route: "page1"},
        {title: "Page2", route: "page2"}
    ];
    localStorage.setItem("headers.{{NAME}}", JSON.stringify(routes));
}

function App() {
    passRoutesToBase();
    return (
      <div>
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="page1" element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
        </Routes>
      </div>
    );
}

export default App;


