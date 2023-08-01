import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../../common/constant";
import orderService from "../../service/order.service";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    orderService
      .getOrderByUser()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div class="card paint-card">
        <div class="card-body">
          <h4 class="form-signin-heading text-center text-primary">
            Order Details
          </h4>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Order Id</th>
                <th scope="col">Menu</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((item, ind) => (
                <tr>
                  <th scope="row">
                    <img
                      src={BASE_API_URL + "/" + item.food.image}
                      width="70px"
                      height="70px"
                    />
                  </th>

                  <th scope="row">{item.orderNumber}</th>

                  <td>
                    {item.food.title}
                    <br />
                    Category: {item.food.category.categoryName}
                  </td>

                  <td>{item.quantity}</td>

                  <td>{item.food.price}</td>
                  <td>{item.paymentType}</td>
                  <td className="fw-bold">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
