import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { IoIosPhonePortrait } from "react-icons/io"
import { IoLockClosedOutline } from "react-icons/io5"
import { BASE_URL } from "../../../../Utils/constants"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/main-logo.png"
export default function Login({ saveUser }) {
  const navigate = useNavigate()
  let {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${BASE_URL}/api/v1/Users/Login`, data)
      localStorage.setItem("foodToken", response.data.token)
      saveUser() // Save user to state
      toast.success("Login Successful")
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-contnet-center align-items-center">
            <div className="col-md-6 col-lg-4 mx-auto p-3">
              <div className="card rounded-3 bg-white px-4 py-3">
                <div className="card-body">
                  <h3 className="text-center">
                    <img src={logo} className="w-75" alt="logo" />
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
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
                          pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                            message:
                              "Password must contain at least one numeric digit, one uppercase and one lowercase letter",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                    <div className="links justify-content-between d-flex">
                      <Link
                        to={"/forget-password"}
                        className="text-decoration-none text-muted"
                      >
                        Forgot Password?
                      </Link>
                      <Link
                        to={"/register"}
                        className="text-decoration-none text-success"
                      >
                        Register now
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success d-block w-100 my-3"
                    >
                      Login
                    </button>
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
