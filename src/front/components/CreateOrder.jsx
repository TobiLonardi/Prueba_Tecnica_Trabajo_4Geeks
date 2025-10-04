import { useState } from "react";
import { Link, useParams } from "react-router-dom";


export const CreateOrder = () => {
  const { theId } = useParams()

  const [formData, setFormData] = useState({
    product_name: "",
    amount: "",
    user_id: theId
  });

  const url = import.meta.env.VITE_BACKEND_URL; 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: theId 

    });
    console.log(theId)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Pedido creado correctamente ✅");
        setFormData({ product_name: "", amount: "", user_id: theId });
      } else {
        const data = await response.json();
        alert(`Error: ${data.msg || "No se pudo crear el pedido"}`);
        console.log(formData)
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Crear un Pedido</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        
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
            placeholder="Ej: 3"
            required
          />
        </div>

        

        <button type="submit" className="btn btn-primary w-100">
          Crear Pedido
        </button>
      </form>
    </div>
  );
};