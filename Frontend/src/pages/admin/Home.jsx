import React from "react";
import "./Admin.css";

const Home = () => {
  return (
    <>
      <div className="row cardx" >
        <p class="text-center fs-1">Admin Dashboard</p>

        <div class="col-md-4 ">
          <a class="text-decoration-none bg-custom">
            <div class="card paint-card">
              <div class="card-body text-center">
                <i class="bi bi-card-checklist fa-2x"></i>
                <br />
                <p class="fs-3 text-dark">Category</p>
                <p class="fs-3 text-dark"></p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-4">
          <a class="text-decoration-none bg-custom">
            <div class="card paint-card">
              <div class="card-body text-center">
                <i class="bi bi-journal-check fa-2x"></i>
                <br />
                <p class="fs-3 text-dark"> Food</p>
                <p class="fs-3 text-dark"></p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-4">
          <a class="text-decoration-none bg-custom">
            <div class="card paint-card">
              <div class="card-body text-center">
                <i class="bi bi-minecart fa-2x"></i>
                <br />
                <p class="fs-3 text-dark">Order</p>
                <p class="fs-3 text-dark"></p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
