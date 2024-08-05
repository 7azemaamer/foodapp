import React from "react"
import SideBar from "../SideBar/SideBar"
import Navbar from "../Navbar/Navbar"
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

export default function MasterLayout({ user }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-2 p-0 ">
            <SideBar />
          </div>
          <div className="col-md-9 ">
            <Navbar user={user} />
            <Outlet user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
