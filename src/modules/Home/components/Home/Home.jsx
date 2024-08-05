import React from "react"
import { BsArrowRight } from "react-icons/bs"
import Header from "../../../Shared/components/Header/Header"
import img from "../../../../assets/imgs/header-img.png"

export default function Home({ user }) {
  return (
    <>
      <Header
        title={`Welcome ${user?.userName ? user?.userName : ""} ! `}
        description={` This is a welcoming screen for the entry of the application , you
              can now see the options`}
        imgUrl={img}
      />
      <div className="container-fluid mt-3 bg-main-light px-5 py-4 rounded-4">
        <div className="row">
          <div className="col-md-10">
            <h2>
              Fill the <span className="text-main">Recipes</span> !
            </h2>
            <p className="w-50">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-2 justify-content-end d-flex align-items-center">
            <button className="btn btn-main w-100 py-3">
              Fill Recipes <BsArrowRight color="white" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
