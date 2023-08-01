import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_API_URL } from "../common/constant";
import cartService from "../service/cart.service";
import foodService from "../service/food.service";

const ViewFood = () => {
  const [cart, setCart] = useState({
    food: "",
    user: "",
    quantity: "",
  });

  const [food, setFood] = useState({
    title: "",
    description: "",
    price: "",
    status: "",
    category: "",
    image: "",
  });

  const [cartStatus, setCartStatus] = useState(false);

  const { id } = useParams();
  const user = useSelector((st) => st.user);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      let fd = await foodService.getFoodById(id);

      setFood(fd.data);
      cart.food = fd.data;
      cart.user = user;
      let st = await cartService.checkCart(cart);
       setCartStatus(st.data);
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () =>
    toast.success("Added to Cart", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addToCart = (fd) => {
    if (!user) {
      navigate("/login");
    } else {
      cart.food = fd;
      cart.user = user;
      cart.quantity = 1;


      cartService
        .addCart(cart)
        .then((res) => {
          notify();
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <p className="fs-3 text-center">Food Details</p>
        <div className="col-md-12 paint-card p-5">
          <div className="row">
            <div className="col-md-6 text-end">
              <img
                alt=""
                src={BASE_API_URL + "/" + food.image}
                width="330px"
                height="400px"
              />
            </div>

            <div className="col-md-6">
              <p className="fs-3">{food.title}</p>
              <p>
                <span className="fw-bold">Description : </span>
                <br />
                {food.description}
              </p>
              <p>
                <span className="fw-bold"> Category: </span> 
                 {food.category.categoryName}
              </p>

              <p>
                  <span className="fw-bold">Status : </span>
                  {food.status === "Available" && (
                    <span className="badge bg-success">Available</span>
                  )}

                  {food.status === "Not Available" && (
                    <span className="badge bg-warning">Not Available</span>
                  )}
                </p>

              <p className="fs-5 fw-bold">
                Price :&nbsp;
                <i className="fas fa-rupee-sign"></i>
                &nbsp; {food.price}
              </p>

              <div className="row">
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-money-bill-wave fa-2x"></i>
                  <p>Cash On Delivery</p>
                </div>
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-undo-alt fa-2x"></i>
                  <p>Return Available</p>
                </div>
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-truck-moving fa-2x"></i>
                  <p>Free Shipping</p>
                </div>
              </div>

              {!cartStatus && (
                <a
                  onClick={() => addToCart(food)}
                  className="btn btn-danger col-md-12"
                >
                  Add To Cart
                </a>
              )}

              {cartStatus && (
                <a className="btn btn-danger col-md-12 disabled">
                  Added To Cart
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
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

export default ViewFood;
