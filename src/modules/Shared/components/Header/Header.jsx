import React from "react"

export default function Header({ title, description, imgUrl }) {
  return (
    <>
      <div className="container-fluid p-5 header-img rounded-4">
        <div className="row ">
          <div className="col-md-7 justify-content-center d-flex flex-column">
            <h1 className="text-white">{title}</h1>
            <p className="text-white text-lead  w-75 fs-5">{description}</p>
          </div>
          <div className="col-md-5 d-flex justify-content-end">
            <div className="img">
              <img
                src={imgUrl}
                alt="food"
                className="img-fluid border-0 rounded-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
