import React, { useState, useEffect } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"



export const UserList = () => {
    const [users, setUsers] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${url}/api/users`);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error("Error al obtener los usuarios");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchUsers();
    }, []);

    function OrdersOnClick(theID) {
        navigate("/users/" + theID + "/orders")
    }

    return (
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center">
                    <h2 className="m-0">Listado de Usuarios</h2>
                </div>

                <div className="card-body">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <strong>{user.name}</strong>
                                    </td>
                                    <td>{user.email}</td>
                                    <td className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => OrdersOnClick(user.id)}
                                        >
                                            Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer text-center">
                    <Link to="/register" className="btn btn-primary">
                        Registrarme
                    </Link>
                </div>
            </div>
        </div>
    );
};