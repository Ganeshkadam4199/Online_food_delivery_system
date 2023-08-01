import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";

import categoryService from "../../service/category.service";

const ViewCategory = () => {
  const [categoryList, setCategoryList] = useState([]);

  const [message, setMessge] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    categoryService
      .getAllCategory()
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCategoryRequest = (item) => {
    const sts = window.confirm("Are you sure want Delete");
    if (sts) {
      categoryService
        .deleteCategory(item)
        .then(() => {
          notify("Delete Sucesfully");
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [st, setSt] = useState("No");
  const editCategoryRequest = (item) => {
    const sts = window.confirm("Are you sure want Edit");
    if (sts) {
      setSt("Yes");
      setCategory(item);
    }
  };

  const [category, setCategory] = useState({
    id: "",
    categoryName: "",
    description: "",
  });
  const [imgFile, setImgFile] = useState(null);

  const handleCategoryImage = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("id", category.id);
    fd.append("categoryName", category.categoryName);
    fd.append("description", category.description);
    fd.append("file", imgFile);

    categoryService
      .updateCategory(fd)
      .then(() => {
        notify("Category Update Sucessfully");
        setSt("No");
        init();
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <>
      {st === "No" && (
        <div class="card paint-card cardx">
          <div class="card-body">
            <h4 class="form-signin-heading text-center">Category Details</h4>
            {message && (
              <p className="text-center fw-bold text-success fs-5">{message}</p>
            )}
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">SL No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((item, num) => (
                  <tr key={item.id}>
                    <th scope="row">{num + 1}</th>
                    <td>
                      <img
                        src={BASE_API_URL + "/cat/" + item.image}
                        width="50px"
                        height="50px"
                      />
                    </td>

                    <td>{item.categoryName}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        onClick={() => editCategoryRequest(item)}
                        class="btn btn-sm btn-primary me-2"
                      >
                      <i class="fa-solid fa-pen-to-square"></i>  Edit
                      </button>
                      <button
                        onClick={() => deleteCategoryRequest(item)}
                        class="btn btn-sm btn-danger"
                      >
                       <i class="fa-solid fa-trash"></i> Delete
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
        <div className="col-md-6 offset-md-3">
          <div class="card paint-card cardx">
            <div class="card-body">
              <h4 class="form-signin-heading text-center">Edit Category</h4>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    required
                    name="categoryName"
                    value={category.categoryName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Description
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="form-control"
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={category.description}
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    name="img"
                    onChange={(e) => handleCategoryImage(e)}
                  />
                </div>
                <div className="mb-3">
                  <img
                    src={BASE_API_URL + "/cat/" + category.image}
                    width="80px"
                    height="80px"
                  />
                </div>
                <button
                  class="btn bg-primary text-white col-md-12"
                  type="submit"
                >
                  Add
                </button>

                <div class="text-center p-3"></div>
              </form>
            </div>
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

export { ViewCategory };
