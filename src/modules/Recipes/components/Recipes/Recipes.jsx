import React from "react"
import Header from "../../../Shared/components/Header/Header"

import img from "../../../../assets/imgs/recipes.png"

export default function Recipes() {
  return (
    <>
      <Header
        title={`Recipes Items`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={img}
      />
    </>
  )
}
