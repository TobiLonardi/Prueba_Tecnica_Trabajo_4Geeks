import { Link } from "react-router-dom";
import { useState } from "react";


export const Navbar = () => {

	const [query, setQuery] = useState("");
	const [results, setResults] = useState({ users: [], orders: [] });

	const url = import.meta.env.VITE_BACKEND_URL;

	const handleSearch = async () => {
		try {
			const response = await fetch(`${url}/api/search?q=${query}`);
			if (response.ok) {
				const data = await response.json();
				setResults(data);
			} else {
				alert("No se encontraron resultados");
			}
		} catch (error) {
			console.error("Error al buscar:", error);
		}
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-3">Buscar Usuarios o Pedidos</h2>

			<div className="input-group mb-4">
				<input
					type="text"
					className="form-control"
					placeholder="Buscar por nombre, email o producto..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn btn-primary" onClick={handleSearch}>
					Buscar
				</button>
			</div>

			<h4>Usuarios Encontrados</h4>
			{results.users.length > 0 ? (
				<ul className="list-group mb-4">
					{results.users.map(user => (
						<li key={user.id} className="list-group-item">
							<strong>{user.name}</strong> - {user.email}
						</li>
					))}
				</ul>
			) : <p>No se encontraron usuarios</p>}

			<h4>Pedidos Encontrados</h4>
			{results.orders.length > 0 ? (
				<ul className="list-group">
					{results.orders.map(order => (
						<li key={order.id} className="list-group-item">
							<strong>{order.product_name}</strong> x {order.amount} <br />
							Usuario: {order.user.name} ({order.user.email})
						</li>
					))}
				</ul>
			) : <p>No se encontraron pedidos</p>}
		</div>
	);
};