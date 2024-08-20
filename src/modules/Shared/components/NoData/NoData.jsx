import React from "react"
import img from "../../../../assets/imgs/no-data.png"
export default function NoData() {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center gap-2">
      <img src={img} alt="" className="w-25" />
      <h4 className="mt-2">No Data !</h4>
      <p className="w-25 text-center">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  )
}
