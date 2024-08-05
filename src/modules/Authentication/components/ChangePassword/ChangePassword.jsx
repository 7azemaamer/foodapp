import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { IoLockClosedOutline } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logo from "../../../../assets/imgs/main-logo.png"
import { BASE_URL } from "../../../../Utils/constants"

export default function ChangePassword({ onClose }) {
  const navigate = useNavigate()
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/v1/Users/ChangePassword`,
        data
      )
      toast.success(response.data.message)
      navigate("/login")
    } catch (err) {
      toast.error(err.response?.data.message)
    }
  }

  return (
    <>
      <div className="container-fluid bg-white">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4 mx-auto p-3">
            <div className="card rounded-3 bg-white px-4 py-3">
              <button onClick={onClose} className="close-button">
                Close
              </button>
              <div className="card-body">
                <div className="img-header d-flex justify-content-center">
                  <img className="w-75" src={logo} alt="" />
                </div>
                <div className="header">
                  <h4 className="my-3 text-bolder">Chnage Password</h4>
                  <p className="text-muted">
                    Please enter your Otp or check your inbox
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">
                      <MdEmail />
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
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">
                      <IoLockClosedOutline />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      aria-label="otp"
                      aria-describedby="basic-addon1"
                      {...register("seed", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  {errors.seed && (
                    <p className="text-danger">{errors.seed.message}</p>
                  )}
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">
                      <IoLockClosedOutline />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your new password"
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
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">
                      <IoLockClosedOutline />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                          message:
                            "Password must contain at least one numeric digit, one uppercase and one lowercase letter",
                        },
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button type="submit" className="btn btn-success w-100">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
