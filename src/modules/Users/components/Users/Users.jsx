import React from "react"
import img from "../../../../assets/imgs/recipes.png"
import Header from "../../../Shared/components/Header/Header"
export default function Users() {
  return (
    <>
      <Header
        title={`Users List`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={img}
      />
    </>
  )
}
