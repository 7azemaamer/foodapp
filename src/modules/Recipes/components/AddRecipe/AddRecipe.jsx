import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { useNavigate, useLocation } from "react-router-dom"
import {
  CATEGORIES_URLS,
  GET_TAGS,
  RECIPES_URLS,
} from "../../../../Utils/END_POINTS"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { BiUpload } from "react-icons/bi"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"

export default function AddRecipe() {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [file, setFile] = useState(null)
  let navigate = useNavigate()
  const { state } = useLocation()
  const { recipeData, type } = state || {}
  const status = type ? "edit" : "add"
  console.log(recipeData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
      setFile(acceptedFiles[0])
    },
  })

  const onSubmit = async (data) => {
    const formAppend = new FormData()
    console.log(data)

    formAppend.append("name", data.name)
    formAppend.append("tagId", data.tagId)
    formAppend.append("price", data.price)
    formAppend.append("categoriesIds", data.categoriesIds)
    formAppend.append("description", data.description)

    console.log(file)
    if (file) {
      formAppend.append("recipeImage", file)
    } else {
      toast.error("File is not defined or empty")
    }

    try {
      // let response = await axios.post(RECIPES_URLS.create, formAppend, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
      //   },
      // })
      let response = await axios({
        method: status === "edit" ? "put" : "post",
        url:
          status === "edit"
            ? RECIPES_URLS.update(recipeData.id)
            : RECIPES_URLS.create,
        data: formAppend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      toast.success(
        `${
          status === "edit"
            ? "Recipe Updated Successfully"
            : "Recipe Created Successfully"
        } Successfully`
      )
      console.log(response)
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
  useEffect(() => {
    getCategoriesList()
    getTagsList()
  }, [])

  return (
    <>
      <div className="container-fluid mt-3 bg-main-light px-5 py-4 rounded-4">
        <div className="row">
          <div className="col-md-10">
            <h2>
              Fill <span className="text-main">Recipes</span> !
            </h2>
            <p className="w-50">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-2 justify-content-end d-flex align-items-center">
            <button
              className="btn btn-main w-100 py-3"
              onClick={() => navigate("/dashboard/recipes")}
            >
              All Recipes <BsArrowRight color="white" />
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 mt-4 d-flex justify-content-center align-items-center flex-column"
      >
        <input
          type="text"
          className="form-control mb-3 w-75 bg-light no-outline border-0 py-2"
          placeholder="Recipe Name"
          aria-label="Recipe Name"
          aria-describedby="basic-addon1"
          {...register("name", { required: true })}
          defaultValue={status === "edit" ? recipeData.name : ""}
        />
        {errors.name && (
          <span className="text-danger">{errors.name.message}</span>
        )}

        <select
          className="form-control mb-3 w-75 bg-light no-outline border-0 py-2"
          name="tagId"
          {...register("tagId", { required: true })}
          value={status === "edit" ? recipeData.tag.id : ""}
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagId && (
          <span className="text-danger">{errors.tagId.message}</span>
        )}
        <input
          type="number"
          className="form-control mb-3 w-75 bg-light no-outline border-0 py-2"
          placeholder="Price"
          aria-label="Price"
          aria-describedby="basic-addon1"
          {...register("price", { required: true })}
          defaultValue={status === "edit" ? recipeData.price : ""}
        />
        {errors.price && (
          <span className="text-danger">{errors.price.message}</span>
        )}
        <select
          className="form-control mb-3 w-75 bg-light no-outline border-0 py-2"
          name="categoriesIds"
          {...register("categoriesIds", { required: true })}
          value={
            status === "edit"
              ? recipeData.category.map((category) => category.id)
              : ""
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoriesIds && (
          <span className="text-danger">{errors.categoriesIds.message}</span>
        )}
        <textarea
          className="form-control mb-3 w-75 bg-light no-outline border-0 py-2"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="basic-addon1"
          {...register("description", { required: true })}
          defaultValue={status === "edit" ? recipeData.description : ""}
        ></textarea>
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
        <div
          {...getRootProps()}
          style={{
            boxSizing: "border-box",
            width: "75%",
            background: "#F1FFF0",
            border: "1px dashed #009247",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <BiUpload size={40} />
          <input {...getInputProps()} />
          <p>Drag & drop a file here, or click to select a file</p>
        </div>
        <div className="d-flex gap-3 justify-content-end w-75 mt-3">
          <Button
            onClick={() => navigate("/dashboard/recipes")}
            variant="outline-success"
            className="px-3"
          >
            Cancel
          </Button>
          <Button type="submit" variant="success" className="px-3">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}
