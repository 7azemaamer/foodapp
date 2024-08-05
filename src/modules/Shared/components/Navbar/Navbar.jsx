import React from "react"
import { BiNotification, BiSearch } from "react-icons/bi"
import { CgNotifications } from "react-icons/cg"
import { FaUserCircle } from "react-icons/fa"
import { MdNotificationsActive } from "react-icons/md"
import { RxAvatar } from "react-icons/rx"

export default function Navbar({ user }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg mt-4 ">
        <div className="container-fluid">
          <form class="d-flex" role="search">
            <div class="input-group mb-3 border border-2 rounded-4 px-2">
              <span
                class="input-group-text bg-white border-0 text-muted"
                id="basic-addon1"
              >
                <BiSearch />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search Here"
                aria-label="Search"
                aria-describedby="basic-addon1"
                className=" border-0"
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
            <div class="nav-item dropdown d-flex  gap-4">
              <a
                class="nav-link dropdown-toggle d-flex gap-2 align-items-center justify-content-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={30} />
                <p className="mt-2">{user?.userName}</p>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
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
