import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../common/constant";
import foodService from "../service/food.service";

const AllFoods = () => {
  const [foodList, setFoodList] = useState([]);

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
  return (
    <>
      <div className="cotainer mt-1">
        <div className="row">
          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-3 text-center">All Food</p>
                <div className="row p-1">
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
                            {f.title} <br />
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

export default AllFoods;
