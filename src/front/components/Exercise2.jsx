import React,{useState} from "react" 
import { useParams } from "react-router-dom";

export const Exercise2 = () =>{
    const theId=useParams()

    const defaultValue = {
    "id": theId,
    "name": "",
    "email": ""
}
    const {user,setUser}=useState(defaultValue)
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
}