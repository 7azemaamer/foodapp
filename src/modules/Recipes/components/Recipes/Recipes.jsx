import React, { useContext, useEffect, useState } from "react"
import Header from "../../../Shared/components/Header/Header"
import img from "../../../../assets/imgs/recipes.png"
import { toast } from "react-toastify"
import {
  BASE_IMG_URL,
  CATEGORIES_URLS,
  FAV_URLS,
  GET_TAGS,
  RECIPES_URLS,
} from "../../../../Utils/END_POINTS"
import axios from "axios"
import NoData from "../../../Shared/components/NoData/NoData"
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiEdit,
  BiHeart,
  BiTrash,
} from "react-icons/bi"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation"
import noDataImg from "../../../../assets/imgs/no-data.png"
import { Link, useNavigate } from "react-router-dom"
import { Pagination } from "react-bootstrap"
import { AuthContext } from "../../../../Context/AuthContext"

export default function Recipes() {
  const navigate = useNavigate()
  const [recipesList, setRecipesList] = useState([])
  const [show, setShow] = useState(false)
  const [recipeId, setRecipeId] = useState(null)
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [nameValue, setNameValue] = useState("")
  const [tagValue, setTagValue] = useState("")
  const [categoryValue, setCategoryValue] = useState("")

  const { user } = useContext(AuthContext)

  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    setShow(true)
    setRecipeId(id)
  }

  const getRecipesList = async ({
    pageSize = 4,
    pageNumber = 1,
    name = "",
    tagId = "",
    categoryId = "",
  }) => {
    try {
      let response = await axios.get(RECIPES_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
        params: { pageSize, pageNumber, name, tagId, categoryId },
      })

      setRecipesList(response?.data?.data)
      setArrayOfPages(
        Array(response?.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      )
    } catch (e) {
      console.log(e)
    }
  }
  const getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      setCategories(response?.data?.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getTagsList = async () => {
    try {
      let response = await axios.get(GET_TAGS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })

      setTags(response?.data)
    } catch (e) {
      console.log(e)
    }
  }
  const deleteRecipe = async () => {
    try {
      let response = await axios.delete(RECIPES_URLS.delete(recipeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      getRecipesList()
      setShow(false)
      toast.success("Recipe Deleted Successfully")
    } catch (e) {
      toast.error("Error Deleting Recipe")
    }
  }

  const getNameValue = (e) => {
    getRecipesList({
      pageNumber: 1,
      pageSize: 4,
      name: e.target.value,
      tagId: tagValue,
      categoryId: categoryValue,
    })
    setNameValue(e.target.value)
  }
  const getTagValue = (e) => {
    getRecipesList({
      pageNumber: 1,
      pageSize: 4,
      tagId: e.target.value,
      categoryId: categoryValue,
      name: nameValue,
    })
    setTagValue(e.target.value)
  }
  const getCategoryValue = (e) => {
    getRecipesList({
      pageNumber: 1,
      pageSize: 4,
      categoryId: e.target.value,
      name: nameValue,
      tagId: tagValue,
    })
    setCategoryValue(e.target.value)
  }
  const addToFav = async (recipeId) => {
    try {
      let response = await axios.post(
        FAV_URLS.add,
        { recipeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
          },
        }
      )
      console.log(response)
      toast.success("Added to Favorite")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRecipesList(1, 4)
    getCategoriesList()
    getTagsList()
  }, [])

  return (
    <>
      <Header
        title={`Recipes Items`}
        description={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={img}
      />

      {user?.userGroup !== "SystemUser" && (
        <div className="title p-3 d-flex justify-content-between ">
          <div className="title-info">
            <h1>Recipe Table Details</h1>
            <span>You can check all details</span>
          </div>
          <button
            onClick={() => navigate("/dashboard/add-recipe")}
            className="btn btn-main align-self-center py-2"
          >
            Add New Item
          </button>
        </div>
      )}

      <div className="table-container p-3 mt-3">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-4 d-flex gap-4">
            <select className="form-control" onChange={getTagValue}>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <select className="form-control" onChange={getCategoryValue}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {recipesList.length > 0 ? (
          <>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipe) => (
                  <tr key={recipe.id} className="align-middle">
                    <td scope="row">{recipe.name}</td>
                    <td>
                      <img
                        className="img-list"
                        src={`${
                          recipe.imagePath
                            ? `${BASE_IMG_URL}/${recipe.imagePath}`
                            : `${noDataImg}`
                        }`}
                        alt=""
                      />
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>
                      {console.log(user?.userGroup)}
                      {user?.userGroup === "SystemUser" ? (
                        <>
                          <button
                            className="btn  ms-2"
                            onClick={() => addToFav(recipe.id)}
                          >
                            <BiHeart size={30} />
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            state={{ recipeData: recipe, type: "edit" }}
                            to={`/dashboard/edit-recipe/${recipe.id}`}
                          >
                            <button className="btn btn-main">
                              <BiEdit />
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleShow(recipe.id)}
                          >
                            <BiTrash />
                          </button>
                        </>
                      )}

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
                          <DeleteConfirmation deleteItem={"recipe"} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="outline-danger"
                            onClick={deleteRecipe}
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
        <Pagination.Prev
          onClick={() =>
            getRecipesList({
              pageNumber: arrayOfPages[0],
              pageSize: 4,
            })
          }
        >
          <BiArrowToLeft />
        </Pagination.Prev>
        {arrayOfPages.map((page) => (
          <Pagination.Item
            key={page}
            onClick={() => getRecipesList({ pageNumber: page, pageSize: 4 })}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            getRecipesList({
              pageNumber: arrayOfPages[arrayOfPages.length - 1] + 1,
              pageSize: 4,
            })
          }
        >
          <BiArrowToRight />
        </Pagination.Next>
      </Pagination>
    </>
  )
}
