import { useState } from "react";
import categoryService from "../../service/category.service";
import { ToastContainer, toast } from "react-toastify";


const AddCategory = () => {
  const [category, setCategory] = useState({
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
    fd.append("categoryName", category.categoryName);
    fd.append("description", category.description);
    fd.append("file", imgFile);

    categoryService
      .saveCategory(fd)
      .then(() => {
        notify("Category Added Sucessfully");
        setCategory({
          categoryName: "",
          description: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notify = () =>
    toast.success("Category Added Sucesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="col-md-6 offset-md-3">
      <div class="card paint-card cardx">
        <div class="card-body">
          <h4 class="form-signin-heading text-center">Add Category</h4>

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
                required
                name="img"
                onChange={(e) => handleCategoryImage(e)}
              />
            </div>

            <button class="btn bg-primary text-white col-md-12" type="submit">
              Add
            </button>

            <div class="text-center p-3"></div>
          </form>
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

export { AddCategory };
