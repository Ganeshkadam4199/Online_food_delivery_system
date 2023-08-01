import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../img/back2.jpg";
import userService from "../service/user.service";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const register = (e) => {
    e.preventDefault();
    userService
      .register(user)
      .then(() => {
        succ();
        setUser({
          fullName: "",
          email: "",
          password: "",
          mobNo: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          failed("Email already exists !");
        }
      });
  };

  const succ = () =>
    toast.success("Register Sucesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const failed = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div
      className="container-fluid p-2"
      style={{
        backgroundImage: `url(img/log.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card paint-card">
            <div className="card-header">
              <h3 className="text-center text-dark">Signup</h3>
            </div>
            <div className="card-body">
              <form
                action="addUser"
                className=""
                method="post"
                id="userRegister"
                onSubmit={(e) => register(e)}
              >
                <div className="row">
                  <div className="col">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="form-control form-control-sm"
                      value={user.fullName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control form-control-sm"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col">
                    <label>Mobile No</label>
                    <input
                      type="number"
                      name="mobNo"
                      required
                      maxLength={10}
                      minLength={10}
                      className="form-control form-control-sm"
                      value={user.mobNo}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>Password</label>
                    <input
                      type="text"
                      name="password"
                      required
                      id="psw"
                      className="form-control form-control-sm"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* <div className="col">
                    <label>Confirm Password</label>
                    <input
                      type="text"
                      name="confirmpassword"
                      className="form-control form-control-sm"
                      onChange={(e) => handleChange(e)}
                    />
                  </div> */}
                </div>

                <div className="form-group mt-3">
                  <label>Address</label>
                  <textarea
                    required
                    rows="3"
                    cols=""
                    className="form-control"
                    name="address"
                    value={user.address}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="form-control form-control-sm"
                      value={user.city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control form-control-sm"
                      value={user.state}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="col">
                    <label>Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      className="form-control form-control-sm"
                      value={user.pincode}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="text-center mt-3">
                  <button className="btn btn-primary col-md-12">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export { Signup };
