import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import categoryService from "../../service/category.service";
import foodService from "../../service/food.service";

const AddFood = () => {
  const [food, setFood] = useState({
    title: "",
    description: "",
    price: "",
    status: "",
    categoryId: "",
  });
  const [imgFile, setImgFile] = useState(null);

  const [categoryList, setCategoryList] = useState([]);

  const handleFoodImage = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFood((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const notify = () =>
    toast.success("Food Added Sucesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submitFood = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", food.title);
    fd.append("description", food.description);
    fd.append("price", food.price);
    fd.append("status", food.status);
    fd.append("file", imgFile);
    fd.append("categoryId", food.categoryId);

 //   console.log(food);

    foodService
      .saveFood(fd)
      .then(() => {
        notify();
        setFood({
          title: "",
          description: "",
          price: "",
          status: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    categoryService
      .getAllCategory()
      .then((response) => {
        setCategoryList(response.data);
        // console.log(response.data);
      })
      .catch();
  }, []);

  return (
    <div class="card paint-card cardx">
      <div className="card-header text-dark">
        <h4 class="form-signin-heading text-center">Add Food</h4>
      </div>
      <div class="card-body">
        <form
          noValidate
          class="form-signin"
          method="post"
          onSubmit={(e) => submitFood(e)}
        >
          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Title
              </label>
              <input
                type="text"
                class="form-control"
                required
                name="title"
                value={food.title}
                onChange={(e) => handleInput(e)}
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Description
            </label>
            <textarea
              rows="3"
              cols=""
              class="form-control"
              name="description"
              value={food.description}
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>

          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Category
              </label>
              <select
                name="categoryId"
                class="form-control"
                onChange={(e) => handleInput(e)}
              >
                <option>--select--</option>
                {categoryList.map((category, num) => (
                  <option value={category.id}>{category.categoryName}</option>
                ))}
              </select>
            </div>

            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                required
                name="price"
                value={food.price}
                onChange={(e) => handleInput(e)}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Image
              </label>
              <input
                type="file"
                class="form-control"
                required
                name="img"
                onChange={handleFoodImage}
              />
            </div>

            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Status
              </label>
              <select
                name="status"
                class="form-control"
                required
                onChange={(e) => handleInput(e)}
              >
                <option>--select--</option>
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>
          </div>

          <button class="btn bg-primary text-white col-md-12" type="submit">
            Submit
          </button>

          <div class="text-center p-3"></div>
        </form>
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

export default AddFood;
