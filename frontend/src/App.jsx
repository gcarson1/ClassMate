// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import "./App.css"

import {
createBrowserRouter,
Route,
createRoutesFromElements,
RouterProvider,
} from 'react-router-dom'
//components and pages
import NavBar from "../src/navBars/navBar"
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Route>        
    )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App