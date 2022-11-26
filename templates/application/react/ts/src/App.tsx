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


function App() {
    return (
        <div>
        <div>
            <ul className="flex bg-blue-800 text-white justify-between">
                <li>
                    <Link to="">Home</Link>
                </li>
                <li>
                    <Link to="page1">Page1</Link>
                </li>
                <li>
                    <Link to="page2">Page2</Link>
                </li>
            </ul>
        </div>
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="page1" element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
        </Routes>
      </div>
    );
}

export default App;


