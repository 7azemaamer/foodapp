import React, { useContext, useState } from "react"
import {
  BiCategory,
  BiFoodMenu,
  BiHeart,
  BiHome,
  BiLockOpen,
} from "react-icons/bi"
import { GrUserSettings } from "react-icons/gr"
import { LuLogOut } from "react-icons/lu"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/logo.png"
import { AuthContext } from "../../../../Context/AuthContext"
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { user } = useContext(AuthContext)

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
          {user?.userGroup === "SuperAdmin" && (
            <MenuItem
              icon={<GrUserSettings />}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<BiFoodMenu />}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          {user?.userGroup === "SuperAdmin" && (
            <MenuItem
              icon={<BiCategory />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          )}
          {user?.userGroup === "SystemUser" && (
            <MenuItem
              icon={<BiHeart />}
              component={<Link to="/dashboard/favorite" />}
            >
              Favorite
            </MenuItem>
          )}
          <MenuItem onClick={logout} icon={<LuLogOut />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
