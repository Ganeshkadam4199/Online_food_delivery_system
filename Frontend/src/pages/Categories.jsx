import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_API_URL } from "../common/constant";
import categoryService from "../service/category.service";
import { ToastContainer, toast } from "react-toastify";
import foodService from "../service/food.service";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [ch, setCh] = useState();

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

  const handleSearch = (e) => {
    setCh(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();

    if (!ch) {
      init();
    } else {
      categoryService
        .searchCategory(ch)
        .then((res) => {
          if (res.data.length > 0) {
            setCategoryList(res.data);
          } else {
            notify();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const notify = () => {
    toast.error("Not Available", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div
        className="container-fluid p-3 bg-light"
        style={{ backgroundColor: "#f0f1f2" }}
      >
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={(e) => search(e)} method="post">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="ch"
                  onChange={(e) => handleSearch(e)}
                />
                <button className="btn bg-primary ms-2 text-white">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="cotainer mt-1">
        <div className="row">
          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-3 text-center">All Categories</p>

                {categoryList.length <= 0 && (
                    <div className="text-center">
                      <img src="../img/fd.png" height="200px" />
                      <p className="mt-3 text-center fs-3 text-danger">
                        Not Available !!
                      </p>
                    </div>
                  )}


                <div className="row p-1">
                  {categoryList.map((c, num) => (
                    <div className="col-md-3" key={c.id}>
                      <div className="card paint-card">
                        <div className="card-body text-center">
                          <img
                            src={BASE_API_URL + "/cat/" + c.image}
                            height="200px"
                            width="100%"
                          ></img>

                          <Link
                            to={"/viewCategoryFood/" + c.id}
                            className="btn btn-sm btn-danger col-md-12 mt-3"
                          >
                            {c.categoryName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
    </>
  );
};

export default Categories;
