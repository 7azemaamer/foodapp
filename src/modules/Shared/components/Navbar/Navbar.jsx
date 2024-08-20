import React, { useContext, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { FaUserCircle } from "react-icons/fa"
import { MdNotificationsActive } from "react-icons/md"
import { AuthContext } from "../../../../Context/AuthContext"

export default function Navbar() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-4 ">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <div className="input-group mb-3 border border-2 rounded-4 px-2">
              <span
                className="input-group-text bg-white border-0 text-muted"
                id="basic-addon1"
              >
                <BiSearch />
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search Here"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end "
            id="navbarSupportedContent"
          >
            <div className="nav-item dropdown d-flex align-items-center  gap-4">
              <a
                className="nav-link dropdown-toggle d-flex gap-2 align-items-center justify-content-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={30} />
                <p className="mt-2">{user?.userName}</p>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Zicoaamer
                  </a>
                </li>
              </ul>
              <MdNotificationsActive size={30} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
