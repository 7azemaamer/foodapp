import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { IoIosPhonePortrait } from "react-icons/io"
import { IoLockClosedOutline } from "react-icons/io5"
import { BASE_URL } from "../../../../Utils/constants"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/main-logo.png"
export default function Register() {
  const navigate = useNavigate()
  let {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${BASE_URL}/api/v1/Users/Register`, data)
      console.log(response)
      toast.success("Login Successful")
      toast.success(response.data.message, {
        autoClose: false,
      })
      navigate("/login")
    } catch (err) {
      console.log(err)
      if (err.response.data?.additionalInfo.errors) {
        const apiErrors = err.response.data.additionalInfo.errors
        for (const key in apiErrors) {
          if (apiErrors.hasOwnProperty(key)) {
            apiErrors[key].forEach((message) => {
              toast.error(message, {
                autoClose: false,
              })
            })
          }
        }
      }
      toast.error(err.response.data.message)
    }
  }
  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-contnet-center align-items-center">
            <div className="col-md-8 col-lg-6 mx-auto p-3">
              <div className="card rounded-3 bg-white px-4 py-3">
                <div className="card-body">
                  <h3 className="text-center">
                    <img src={logo} className="w-75" alt="logo" />
                  </h3>
                  <div className="header-title ">
                    <h4>Register</h4>
                    <p className="lead fs-6">
                      Welcome Back! Please enter your details
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex  gap-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoIosPhonePortrait />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...register("userName", {
                            required: "Username is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="text-danger">{errors.userName.message}</p>
                      )}
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoLockClosedOutline />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
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
                    </div>
                    <div className="d-flex  gap-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoIosPhonePortrait />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Country"
                          aria-label="Country"
                          aria-describedby="basic-addon1"
                          {...register("country", {
                            required: "Country is required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <p className="text-danger">{errors.country.message}</p>
                      )}
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoLockClosedOutline />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          aria-describedby="basic-addon1"
                          {...register("phoneNumber", {
                            required: "Phone number is required",
                          })}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-danger">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="d-flex  gap-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoLockClosedOutline />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <IoLockClosedOutline />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          aria-label="Confirm Password"
                          aria-describedby="basic-addon1"
                          {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                              value === watch("password") ||
                              "Passwords do not match",
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="links justify-content-end d-flex">
                      <Link
                        to={"/login"}
                        className="text-decoration-none text-success"
                      >
                        Login now?
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success d-block w-75 my-3"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
