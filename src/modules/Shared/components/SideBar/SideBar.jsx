import React, { useState } from "react"
import { BiCategory, BiFoodMenu, BiHome, BiLockOpen } from "react-icons/bi"
import { BsToggle2On } from "react-icons/bs"
import { GrUserSettings } from "react-icons/gr"
import { LuLogOut } from "react-icons/lu"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/logo.png"
import Modal from "react-modal"
import ChangePassword from "../../../Authentication/components/ChangePassword/ChangePassword"
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()
  const toggle = () => {
    setIsCollapsed(!isCollapsed)
    const sidebarContainer = document.querySelector(".ps-sidebar-container")
    const logoSide = document.getElementById("side-logo")
    if (sidebarContainer) {
      sidebarContainer.style.borderTopRightRadius = isCollapsed
        ? "85px"
        : "20px"
      logoSide.style.width = !isCollapsed ? "100px" : "200px"
    }
  }

  const logout = () => {
    localStorage.removeItem("foodToken")
    navigate("/login")
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={`sidebar `}>
      <Sidebar className="side-bar" collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            id="menu-toggle"
            onClick={toggle}
            icon={<img id="side-logo" src={logo} alt="logo" />}
          />
          <MenuItem icon={<BiHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<GrUserSettings />}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<BiFoodMenu />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem icon={<BiLockOpen />} onClick={openModal}>
            Change Password
          </MenuItem>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Change Password"
            className="modal"
            overlayClassName="overlay"
          >
            <ChangePassword onClose={closeModal} />
          </Modal>
          <MenuItem onClick={logout} icon={<LuLogOut />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
