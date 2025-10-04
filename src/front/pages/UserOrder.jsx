import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserOrder = () => {
  const { userId } = useParams(); // obtiene el id desde la URL
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Pedidos del Usuario</h2>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <strong>{order.product_name}</strong> – Cantidad: {order.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Este usuario no tiene pedidos registrados.</p>
      )}
    </div>
  );
};