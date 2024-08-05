import React from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ user, children }) {
  if (localStorage.getItem("foodToken") || user) {
    return children
  } else return <Navigate to="/login" />
}
