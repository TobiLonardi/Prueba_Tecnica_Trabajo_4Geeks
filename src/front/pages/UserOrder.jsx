import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const UserOrder = () => {
  const { theId } = useParams();               
  const [orders, setOrders] = useState([]);    
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({   
    product_name: "",
    amount: "",
    user_id: theId
  });
  const [user,SetUser] = useState({
    Id:"",
    username:"",
    email:""
  })
  

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, [theId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/users/${theId}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Error al cargar pedidos");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async()=>{
    try {
      const response = await fetch(`${url}/api/users/${theId}`);
      if (response.ok) {
        const data = await response.json();
        SetUser(data);
      } else {
        console.error("Error al cargar usuario");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: theId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("✅ Pedido creado correctamente");
        setFormData({ product_name: "", amount: "", user_id: theId });
        fetchOrders(); // refrescar la lista
      } else {
        const data = await response.json();
        alert(`❌ Error: ${data.msg || "No se pudo crear el pedido"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Pedidos del Usuario #{theId}</h2>
      <div className="card p-4 mb-5 shadow">
        <h4>Informacion del usuario</h4>
        <p>Email de usuario: {user["email"]}</p>
        <p>Username del usuario: {user["username"]}</p>
      </div>

      <div className="card p-4 mb-5 shadow">
        <h4>Crear un Pedido</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Producto</label>
            <input
              type="text"
              name="product_name"
              className="form-control"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Ej: Pizza Napolitana"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Ej: 2"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear Pedido
          </button>
        </form>
      </div>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No hay pedidos registrados para este usuario.</p>
      ) : (
        <div className="card p-3 shadow">
          <h4 className="mb-3">Historial de Pedidos</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha de Creación</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product_name}</td>
                  <td>{order.amount}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};