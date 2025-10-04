import React, { useState, useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom"



export const UserList = () => {

    const [users, setUsers] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

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
    return (
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white text-center">
                    <h2 className="m-0">Listado de Usuarios</h2>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{user.name}</strong>
                                    <span className="text-muted"> - {user.email}</span>
                                </div>
                                <i className="bi bi-person-circle text-primary fs-4"></i>
                            </li>
                        ))}
                    </ul>
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