import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_API_URL } from "../common/constant";
import categoryService from "../service/category.service";
import foodService from "../service/food.service";

const CategoryFood = () => {
  const [ch, setCh] = useState();
  const [foodList, setFoodList] = useState([]);
  const [category, setCategory] = useState();
  const { id } = useParams();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    foodService
      .getFoodByCategory(id)
      .then((response) => {
        setFoodList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    categoryService
      .getCategoryById(id)
      .then((response) => {
        setCategory(response.data.categoryName);
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

    // if (!ch) {
    //   init();
    // } else {
    //   homeService
    //     .searchHome(ch)
    //     .then((res) => {
    //       if (res.data.length > 0) {
    //         setHomeList(res.data);
    //       } else {
    //         notify();
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
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
                <p className="fs-3 text-center">{category} Food</p>
                <div className="row p-1">
                  {foodList.length <= 0 && (
                    <div className="text-center">
                      <img src="../img/fd.png" height="200px" />
                      <p className="mt-3 text-center fs-3 text-danger">
                        Not Available !!
                      </p>
                    </div>
                  )}

                  {foodList.map((f, num) => (
                    <div className="col-md-3" key={f.id}>
                      <div className="card paint-card">
                        <div className="card-body text-center">
                          <img
                            src={BASE_API_URL + "/" + f.image}
                            height="200px"
                            width="100%"
                          ></img>
                          <p>
                            {f.title}
                            <br />
                            {f.status == "Available" && (
                              <span className="badge bg-success">
                                Available
                              </span>
                            )}
                            {f.status == "Not Available" && (
                              <span className="badge bg-warning">
                                Not Available
                              </span>
                            )}
                          </p>
                          <Link
                            to={"/viewFood/" + f.id}
                            className="btn btn-sm btn-primary"
                          >
                            View Details
                          </Link>
                          <Link to="/" className="btn btn-sm btn-danger ms-2">
                            &#8377; {f.price}
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
    </>
  );
};

export default CategoryFood;
