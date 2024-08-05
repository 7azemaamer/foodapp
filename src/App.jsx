import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout"
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout"
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass"
import Home from "./modules/Home/components/Home/Home"
import Recipes from "./modules/Recipes/components/Recipes/Recipes"
import Categories from "./modules/Categories/components/Categories/Categories"
import Users from "./modules/Users/components/Users/Users"
import ForgetPassword from "./modules/Authentication/components/ForgetPassword/ForgetPassword"
import Login from "./modules/Authentication/components/Login/Login"
import NotFound from "./modules/Shared/components/NotFound/NotFound"
import { jwtDecode } from "jwt-decode"
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute"
import { useState } from "react"
import Register from "./modules/Authentication/components/Register/Register"

function App() {
  const [user, setUser] = useState(null)

  const saveUser = () => {
    const encodedUser = localStorage.getItem("foodToken")

    if (encodedUser) {
      let user = jwtDecode(encodedUser)

      setUser(user)
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login saveUser={saveUser} /> },
        { path: "login", element: <Login saveUser={saveUser} /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute user={user}>
          <MasterLayout user={user} />
        </ProtectedRoute>
      ),

      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "recipes", element: <Recipes /> },
        { path: "categories", element: <Categories /> },
        { path: "users", element: <Users /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
