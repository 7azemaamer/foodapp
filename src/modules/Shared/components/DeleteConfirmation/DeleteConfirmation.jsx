import React from "react"
import deleteImg from "../../../../assets/imgs/delete-category.png"
export default function DeleteConfirmation({ deleteItem }) {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center ">
      <img src={deleteImg} alt="delete" />
      <h4 className="mt-3">Delete This {deleteItem} ?</h4>
      <p className="w-50 text-center">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  )
}
