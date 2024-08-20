import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"

export let AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const saveUser = () => {
    const encodedUser = localStorage.getItem("foodToken")

    if (encodedUser) {
      let user = jwtDecode(encodedUser)
      setUser(user)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("foodToken")) {
      saveUser()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ saveUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
