import React, { useEffect, useState } from "react"
import Header from "../../../Shared/components/Header/Header"
import img from "../../../../assets/imgs/recipes.png"
import { toast } from "react-toastify"
import { BASE_IMG_URL, USERS_URLS } from "../../../../Utils/END_POINTS"
import axios from "axios"
import NoData from "../../../Shared/components/NoData/NoData"
import { BiArrowToLeft, BiArrowToRight, BiEdit, BiTrash } from "react-icons/bi"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation"
import noDataImg from "../../../../assets/imgs/no-data.png"
import { Pagination } from "react-bootstrap"

export default function Users() {
  const [usersList, setUsersList] = useState([])
  const [show, setShow] = useState(false)
  const [userId, setUserId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    document.querySelector(".ps-sidebar-container").style.height = "125vh"
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    setShow(true)
    setUserId(id)
  }

  let getUsersList = async (pageNumber, pageSize) => {
    try {
      let response = await axios.get(USERS_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
        params: { pageNumber, pageSize },
      })
      setUsersList(response?.data?.data)
      setCurrentPage(pageNumber)
      setTotalPages(response?.data.totalNumberOfPages)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(USERS_URLS.delete(userId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      getUsersList(currentPage, 4)
      setShow(false)
      toast.success("User Deleted Successfully")
    } catch (e) {
      toast.error("Error Deleting User")
    }
  }

  useEffect(() => {
    getUsersList(1, 4)
  }, [])

  const renderPaginationItems = () => {
    const pageItems = []
    const maxItems = 5
    const halfMaxItems = Math.floor(maxItems / 2)
    const startPage = Math.max(2, currentPage - halfMaxItems)
    const endPage = Math.min(totalPages - 1, currentPage + halfMaxItems)

    pageItems.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => getUsersList(1, 4)}
      >
        1
      </Pagination.Item>
    )

    if (startPage > 2) {
      pageItems.push(<Pagination.Ellipsis key="ellipsis-start" />)
    }

    for (let page = startPage; page <= endPage; page++) {
      pageItems.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => getUsersList(page, 4)}
        >
          {page}
        </Pagination.Item>
      )
    }

    if (endPage < totalPages - 1) {
      pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />)
    }

    if (totalPages > 1) {
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => getUsersList(totalPages, 4)}
        >
          {totalPages}
        </Pagination.Item>
      )
    }

    return pageItems
  }

  return (
    <>
      <Header
        title={`Users List`}
        description={`You can manage your users here, including adding, editing, and deleting user accounts.`}
        imgUrl={img}
      />

      <div className="title p-3 d-flex justify-content-between ">
        <div className="title-info">
          <h1>User Table Details</h1>
          <span>You can check all user details</span>
        </div>
        <button className="btn btn-main align-self-center py-2">
          Add New User
        </button>
      </div>

      <div className="table-container p-3">
        {usersList.length > 0 ? (
          <>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Country</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className="align-middle">
                    <td scope="row">{user.id}</td>
                    <td>{user.userName}</td>
                    <td>
                      <img
                        className="img-list"
                        src={`${
                          user.imagePath
                            ? `${BASE_IMG_URL}/${user.imagePath}`
                            : `${noDataImg}`
                        }`}
                        alt=""
                      />
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.country}</td>
                    <td>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleShow(user.id)}
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
                          <DeleteConfirmation deleteItem={"user"} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="outline-danger" onClick={deleteUser}>
                            Delete this user
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
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => getUsersList(currentPage - 1, 4)}
        >
          <BiArrowToLeft />
        </Pagination.Prev>
        {renderPaginationItems()}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => getUsersList(currentPage + 1, 4)}
        >
          <BiArrowToRight />
        </Pagination.Next>
      </Pagination>
    </>
  )
}
