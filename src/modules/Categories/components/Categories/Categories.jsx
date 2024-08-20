import React, { useEffect, useState } from "react"
import img from "../../../../assets/imgs/recipes.png"
import Header from "../../../Shared/components/Header/Header"
import axios from "axios"
import { CATEGORIES_URLS } from "../../../../Utils/END_POINTS"
import { BiArrowToLeft, BiArrowToRight, BiEdit, BiTrash } from "react-icons/bi"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation"
import { toast } from "react-toastify"
import NoData from "../../../Shared/components/NoData/NoData"
import { useForm } from "react-hook-form"
import { Pagination } from "react-bootstrap"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [show, setShow] = useState(false)
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [categoryId, setCategoryId] = useState(null)
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [nameValue, setNameValue] = useState("")

  const handleClose = () => setShow(false)
  const handleCloseAddEdit = () => {
    setShowAddEdit(false)
    setCategoryId(null)
  }
  const handleShow = (id) => {
    setShow(true)
    setCategoryId(id)
  }
  const handleShowAddEdit = (id = null) => {
    setCategoryId(id)
    setShowAddEdit(true)
  }

  let getCategoriesList = async (pageNumber, pageSize, name) => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
        params: { pageNumber, pageSize, name },
      })
      setCategories(response?.data?.data)
      setArrayOfPages(
        Array(response?.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      )
    } catch (e) {
      console.log(e)
    }
  }
  const deleteCategory = async () => {
    try {
      let response = await axios.delete(CATEGORIES_URLS.delete(categoryId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      console.log(response)
      getCategoriesList()
      setShow(false)
      toast.success("Category Deleted Successfully")
    } catch (e) {
      toast.error("Error Deleting Category")
    }
  }

  const onSubmit = async (data) => {
    try {
      if (categoryId) {
        // Edit Category
        let response = await axios.put(
          CATEGORIES_URLS.update(categoryId),
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
            },
          }
        )
        console.log(response)
        toast.success("Category Updated Successfully")
      } else {
        // Add Category
        let response = await axios.post(CATEGORIES_URLS.create, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
          },
        })
        console.log(response)
        toast.success("Category Added Successfully")
      }
      getCategoriesList()
      handleCloseAddEdit()
    } catch (e) {
      toast.error(
        categoryId ? "Error Updating Category" : "Error Adding Category"
      )
    }
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    getCategoriesList(1, 4, "")
  }, [])

  useEffect(() => {
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId)
      if (category) {
        setValue("name", category.name)
      }
    } else {
      setValue("name", "")
    }
  }, [categoryId, setValue])

  const getNameValue = (e) => {
    setNameValue(e.target.value)
    getCategoriesList(1, 4, e.target.value)
  }

  return (
    <>
      <Header
        title={`Categories Items`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={img}
      />
      <div className="title p-3 d-flex justify-content-between ">
        <div className="title-info">
          <h1>Categories Table Details</h1>
          <span>You can check all details</span>
        </div>
        <button
          onClick={() => handleShowAddEdit()}
          className="btn btn-main align-self-center py-2"
        >
          Add New Category
        </button>
        <Modal
          show={showAddEdit}
          onHide={handleCloseAddEdit}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{
            top: "50%",
            left: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <h4>{categoryId ? "Edit Category" : "Add New Category"}</h4>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Category Name "
                aria-label="Category Name"
                aria-describedby="basic-addon1"
                {...register("name", { required: true })}
              />
              <Button type="submit" variant="outline-success">
                Save
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      <div className="table-container p-3">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={getNameValue}
        />
        {categories.length > 0 ? (
          <>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="align-middle">
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td>
                      <button
                        className="btn btn-main"
                        onClick={() => handleShowAddEdit(category.id)}
                      >
                        <BiEdit />
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleShow(category.id)}
                      >
                        <BiTrash />
                      </button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        style={{
                          top: "50%",
                          left: "50%",
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          <DeleteConfirmation deleteItem={"Category"} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="outline-danger"
                            onClick={deleteCategory}
                          >
                            Delete this item
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <NoData />
        )}
      </div>
      <Pagination aria-label="Page navigation example">
        <Pagination.Prev onClick={() => getCategoriesList(arrayOfPages[0], 4)}>
          <BiArrowToLeft />
        </Pagination.Prev>
        {arrayOfPages.map((page) => (
          <Pagination.Item
            key={page}
            onClick={() => getCategoriesList(page, 4)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            getCategoriesList(arrayOfPages[arrayOfPages.length - 1], 4)
          }
        >
          <BiArrowToRight />
        </Pagination.Next>
      </Pagination>
    </>
  )
}
