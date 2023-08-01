import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../common/constant";
import foodService from "../../service/food.service";
import { ToastContainer, toast } from "react-toastify";
import categoryService from "../../service/category.service";
const ViewFood = () => {
  const [foodList, setFoodList] = useState([]);
  const [st, setSt] = useState("No");

  const [food, setFood] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    status: "",
    categoryId: "",
    category: "",
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

  const notify = (msg) =>
    toast.success(msg, {
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
    fd.append("id", food.id);
    fd.append("title", food.title);
    fd.append("description", food.description);
    fd.append("price", food.price);
    fd.append("status", food.status);
    fd.append("img", imgFile);
    fd.append("categoryId", food.categoryId);

    console.log(food);

    foodService
      .updateFOod(fd)
      .then(() => {
        notify("Food Update Sucesfully");
        setSt("No");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const init = () => {
    foodService
      .getAllFood()
      .then((res) => {
        setFoodList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const editFoodRequest = (f) => {
    const sts = window.confirm("Are you sure want Edit");
    if (sts) {
      setSt("Yes");
      setFood(f);
      categoryService
        .getAllCategory()
        .then((response) => {
          setCategoryList(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteFoodRequest = (f) => {
    const sts = window.confirm("Are you sure want Delete");
    if (sts) {
      foodService
        .deleteFood(f.id)
        .then((res) => {
          notify("Delete Sucessfully");
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {st === "No" && (
        <div className="card paint-card cardx">
          <div className="card-header fs-4 text-center text-dark">
            View Food
          </div>
          <div className="card-body">
            <table class="table ">
              <thead>
                <tr>
                  <th scope="col">SL No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {foodList.map((f, num) => (
                  <tr key={f.id}>
                    <th scope="row">{num + 1}</th>
                    <td>
                      <img
                        src={BASE_API_URL + "/" + f.image}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{f.title}</td>
                    <td>{f.category.categoryName}</td>
                    <td>{f.price}</td>
                    <td>
                      {f.status === "Available" && (
                        <span className="badge bg-success">Available</span>
                      )}
                      {f.status === "Not Available" && (
                        <span className="badge bg-warning">Not Available</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => editFoodRequest(f)}
                        class="btn btn-sm btn-primary"
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFoodRequest(f)}
                        class="btn btn-sm btn-danger ms-2"
                      >
                        <i class="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {st === "Yes" && (
        <div class="card paint-card cardx">
          <div className="card-header text-dark">
            <h4 class="form-signin-heading text-center">Edit Food</h4>
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
                    <option value={food.category.id}>
                      {food.category.categoryName}
                    </option>
                    {categoryList.map((category, num) => (
                      <option value={category.id}>
                        {category.categoryName}
                      </option>
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
                    <option>{food.status}</option>
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </div>
              </div>

              <div>
                <img
                  src={BASE_API_URL + "/" + food.image}
                  width="100px"
                  height="100px"
                />
              </div>

              <button
                class="btn bg-primary text-white col-md-12 mt-3"
                type="submit"
              >
                Submit
              </button>

              <div class="text-center p-3"></div>
            </form>
          </div>
        </div>
      )}

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
    </>
  );
};

export default ViewFood;
