import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { IoIosPhonePortrait } from "react-icons/io"
import { toast } from "react-toastify"
import { BASE_URL } from "../../../../Utils/constants"
import { useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/main-logo.png"

export default function ForgetPassword() {
  const navigate = useNavigate()
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/v1/Users/Reset/Request`,
        data
      )
      toast.success(response.data.message)
      navigate("/reset-password")
    } catch (err) {
      toast.error(err.response?.data.message)
    }
  }
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-contnet-center align-items-center">
          <div className="col-md-6 col-lg-4 mx-auto p-3">
            <div className="card rounded-3 bg-white px-4 py-3">
              <div className="card-body">
                <div className=" img-header d-flex justify-content-center">
                  <img className="w-75" src={logo} alt="" />
                </div>
                <div className="header">
                  <h4 className="my-3 text-bolder">Forget Your Password?</h4>
                  <p className="">
                    No Worries! Please enter your email and we will send you a
                    password reset link.
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group my-5">
                    <span className="input-group-text" id="basic-addon1">
                      <IoIosPhonePortrait />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                  <button className="d-block w-100 btn btn-success">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
