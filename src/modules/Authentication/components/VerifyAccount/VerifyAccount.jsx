import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { IoLockClosedOutline } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import logo from "../../../../assets/imgs/main-logo.png"
import { USERS_URLS } from "../../../../Utils/END_POINTS"

export default function VerifyAccount() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(USERS_URLS.verifyAccount, data)
      toast.success(response.data.message)
      navigate("/login")
    } catch (err) {
      toast.error(err.response?.data.message)
    }
  }

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 col-lg-4 mx-auto p-3">
              <div className="card rounded-3 bg-white px-4 py-3">
                <div className="card-body">
                  <div className="img-header d-flex justify-content-center">
                    <img className="w-75" src={logo} alt="logo" />
                  </div>
                  <div className="header">
                    <h4 className="my-3 text-bolder">Verify Account</h4>
                    <p className="text-muted">
                      Please enter your email and verification code
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
                        placeholder="Verification Code"
                        aria-label="Code"
                        aria-describedby="basic-addon1"
                        {...register("code", {
                          required: "Verification code is required",
                        })}
                      />
                    </div>
                    {errors.code && (
                      <p className="text-danger">{errors.code.message}</p>
                    )}

                    <button type="submit" className="btn btn-success w-100">
                      Verify Account
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
