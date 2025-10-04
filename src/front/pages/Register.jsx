import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"


export const Register = () => {
    const [user, setUser] = useState({ email: "", username: "" });

    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()


    const handleChange = ({ target }) => {
        setUser(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.status === 201) {
            alert("Usuario registrado con éxito");
            setUser({ email: "", username: "" });
            navigate("/")
        } else {
            alert(data.message || "Error al registrar el usuario");
        }
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row justify-content-center my-5">
                <h2 className="text-center my-3">Registrate para continuar</h2>
                <div className="col-12 col-md-6 rounded-4 py-4 bg-dark">
                    <form className="m-2 p-3" onSubmit={handleSubmit}>
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnEmail">Correo electrónico</label>
                            <input
                                type="text"
                                placeholder="JhonDoe@gmail.com"
                                className="form-control"
                                id="btnEmail"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnName">Username</label>
                            <input
                                type="text"
                                placeholder="JhonDoe18"
                                className="form-control"
                                id="btnName"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-outline-light w-100">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};