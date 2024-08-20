import React, { useContext } from "react"
import { AuthContext } from "../../../../Context/AuthContext"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function RoleProtector({ children }) {
  const { user } = useContext(AuthContext)

  if (user?.userGroup === "SystemUser") {
    toast.error("Not Allowed For Normal Users!", {
      autoClose: false,
    })
    return <Navigate to="/dashboard" />
  } else return children
}
