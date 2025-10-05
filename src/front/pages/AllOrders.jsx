import React, { useState, useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom"
import { string } from "prop-types";



export const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${url}/api/orders`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setOrders(data);
                } else {
                    console.error("Error al obtener los ordenes");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchOrders();
    }, []);

    const exportToJSON = () => {
        const jsonString = JSON.stringify(orders, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "orders.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center">
                    <h2 className="m-0">Listado de órdenes</h2>
                </div>

                <div className="card-body">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.product_name}</td>
                                    <td>{order.amount}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>{order.user_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={exportToJSON}>Exportar json</button>
                </div>
            </div>
        </div>
    );
};