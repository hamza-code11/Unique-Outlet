import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`);
        setOrder(response.data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Name: {order.name}</p>
      <p>Email: {order.email}</p>
      <p>Phone: {order.phone}</p>
      <p>Address: {order.street_address}</p>

      <h3>Products</h3>
      {order.order_items.map(item => (
        <div key={item.id}>
          <p>{item.product_name}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}

      <h3>Bank Details</h3>
      <p>Bank: HBL</p>
      <p>Account: 123456789</p>
    </div>
  );
};

export default OrderConfirmation;