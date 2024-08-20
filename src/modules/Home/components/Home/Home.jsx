import React, { useContext } from "react"
import { BsArrowRight } from "react-icons/bs"
import Header from "../../../Shared/components/Header/Header"
import img from "../../../../assets/imgs/header-img.png"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../../Context/AuthContext"

export default function Home() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  return (
    <>
      <Header
        title={`Welcome ${user?.userName ? user?.userName : ""} ! `}
        description={`This is a welcoming screen for the entry of the application, you
              can now see the options`}
        imgUrl={img}
      />
      <div className="container-fluid mt-3 bg-main-light px-5 py-4 rounded-4">
        <div className="row">
          <>
            <div className="col-md-10">
              <h2>
                {user?.userGroup !== "SystemUser" ? (
                  <>
                    Fill <span className="text-main">Recipes</span> !
                  </>
                ) : (
                  <>
                    View <span className="text-main">Recipes</span> !
                  </>
                )}
              </h2>
              <p className="w-50">
                {user?.userGroup !== "SystemUser"
                  ? `You can now fill the meals easily using the table and form.
                Click here and fill it with the table!`
                  : `You can now View the meals easily.
                Click here and View it`}
              </p>
            </div>
            <div className="col-md-2 justify-content-end d-flex align-items-center">
              <button
                className="btn btn-main w-100 py-3"
                onClick={() => {
                  user?.userGroup !== "SystemUser"
                    ? navigate("/dashboard/add-recipe")
                    : navigate("/dashboard/recipes")
                }}
              >
                {user?.userGroup !== "SystemUser" ? "Fill" : "View"} Recipes
                <BsArrowRight color="white" className="ps-1" />
              </button>
            </div>
          </>
        </div>
      </div>
    </>
  )
}
